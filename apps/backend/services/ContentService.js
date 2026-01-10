import contentRepository from '../repositories/ContentRepository.js';

const defaultContent = {
  landing: {
    en: '<h1>Welcome</h1><p>Welcome to our platform.</p>',
    nl: '<h1>Welkom</h1><p>Welkom op ons platform.</p>',
    de: '<h1>Willkommen</h1><p>Willkommen auf unserer Plattform.</p>',
    fr: '<h1>Bienvenue</h1><p>Bienvenue sur notre plateforme.</p>',
    es: '<h1>Bienvenido</h1><p>Bienvenido a nuestra plataforma.</p>'
  },
  storytelling: {
    en: '<h1>My Story</h1><p>Share your story here.</p>',
    nl: '<h1>Mijn verhaal</h1><p>Deel hier jouw verhaal.</p>',
    de: '<h1>Meine Geschichte</h1><p>Teile deine Geschichte hier.</p>',
    fr: '<h1>Mon histoire</h1><p>Partagez votre histoire ici.</p>',
    es: '<h1>Mi historia</h1><p>Comparte tu historia aquí.</p>'
  },
  whatILookFor: {
    en: '<h1>What I Look For</h1><p>Looking for investors and co-founders.</p>',
    nl: '<h1>Waar ik naar op zoek ben</h1><p>Op zoek naar investeerders en medeoprichters.</p>',
    de: '<h1>Wonach ich suche</h1><p>Ich suche Investoren und Mitgründer.</p>',
    fr: '<h1>Ce que je recherche</h1><p>Je recherche des investisseurs et des cofondateurs.</p>',
    es: '<h1>Lo que busco</h1><p>Busco inversores y cofundadores.</p>'
  },
  developerHelp: {
    en: '<h1>Developer Help</h1><p>Need help with IDEs, n8n, and Vibe Coding.</p>',
    nl: '<h1>Developer Help</h1><p>Hulp nodig met IDE’s, n8n en Vibe Coding.</p>',
    de: '<h1>Entwicklerhilfe</h1><p>Hilfe bei IDEs, n8n und Vibe Coding.</p>',
    fr: '<h1>Aide aux développeurs</h1><p>Aide pour les IDE, n8n et le Vibe Coding.</p>',
    es: '<h1>Ayuda para desarrolladores</h1><p>Ayuda con IDEs, n8n y Vibe Coding.</p>'
  },
  financialHelp: {
    en: '<h1>Financial Support</h1><p>Support our mission.</p>',
    nl: '<h1>Financiële steun</h1><p>Steun onze missie.</p>',
    de: '<h1>Finanzielle Unterstützung</h1><p>Unterstütze unsere Mission.</p>',
    fr: '<h1>Soutien financier</h1><p>Soutenez notre mission.</p>',
    es: '<h1>Apoyo financiero</h1><p>Apoya nuestra misión.</p>'
  },
  support: {
    en: '<h1>Support</h1><p>Thank you for your support!</p>',
    nl: '<h1>Support</h1><p>Bedankt voor je steun!</p>',
    de: '<h1>Support</h1><p>Danke für deine Unterstützung!</p>',
    fr: '<h1>Support</h1><p>Merci pour votre soutien !</p>',
    es: '<h1>Soporte</h1><p>¡Gracias por tu apoyo!</p>'
  },
  adhDAries: {
    en: '<h1>ADHD + Aries</h1><p>The importance of ADHD combined with Aries strengths.</p>',
    nl: '<h1>ADHD + Ram</h1><p>Het belang van ADHD gecombineerd met de sterke punten van Ram.</p>',
    de: '<h1>ADHS + Widder</h1><p>Die Bedeutung von ADHS in Kombination mit den Stärken des Widders.</p>',
    fr: '<h1>TDAH + Bélier</h1><p>L’importance du TDAH combiné aux forces du Bélier.</p>',
    es: '<h1>TDAH + Aries</h1><p>La importancia del TDAH combinado con las fortalezas de Aries.</p>'
  },
  qrRedirectUrl: process.env.APP_URL || 'https://example.com',
  'video-script-story': '',
  'video-script-proposal': '',
  'video-script-proof': '',
  'video-subtitles-story': '',
  'video-subtitles-proposal': '',
  'video-subtitles-proof': '',
  'video-transcript-story': '',
  'video-transcript-proposal': '',
  'video-transcript-proof': '',
  mindmap: `mindmap
  root((IdeaFabric))
    Vision
      Shape ideas
      Build systems
    Workflow
      Capture
      Map
      Execute
    Team
      Co-founder
      Investor
    Stack
      Frontend
      n8n agents
  `
};

const normalizeLanguage = (language) => (language || 'en').toLowerCase();

const parseContentValue = (contentValue) => {
  if (typeof contentValue !== 'string') {
    return { en: '' };
  }

  try {
    const parsed = JSON.parse(contentValue);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // contentValue is plain text, not JSON
  }

  return { en: contentValue };
};

const serializeContentValue = (contentMap) => JSON.stringify(contentMap);

class ContentService {
  async getContent(pageId, language = 'en') {
    let content = await contentRepository.findOne({ pageId });
    
    // If content doesn't exist, create default
    if (!content) {
      const defaults = defaultContent[pageId] || { en: '<p>Content coming soon.</p>' };
      const contentValue = typeof defaults === 'string' ? defaults : serializeContentValue(defaults);
      content = await contentRepository.create({
        pageId,
        content: contentValue
      });
    }

    const normalizedLanguage = normalizeLanguage(language);
    const contentMap = parseContentValue(content.content);
    const resolvedContent = contentMap[normalizedLanguage] || contentMap.en || content.content;

    return { ...content, content: resolvedContent };
  }

  async updateContent(pageId, contentData, updatedBy) {
    const normalizedLanguage = contentData.language ? normalizeLanguage(contentData.language) : null;
    if (!normalizedLanguage) {
      return await contentRepository.findOneAndUpdate(
        { pageId },
        { 
          content: contentData.content,
          updatedBy
        },
        { upsert: true }
      );
    }

    const existing = await contentRepository.findOne({ pageId });
    const contentMap = existing ? parseContentValue(existing.content) : {};
    contentMap[normalizedLanguage] = contentData.content;

    return await contentRepository.findOneAndUpdate(
      { pageId },
      {
        content: serializeContentValue(contentMap),
        updatedBy
      },
      { upsert: true }
    );
  }

  getDefaultContent(pageId, language = 'en') {
    const defaults = defaultContent[pageId] || { en: '<p>Content coming soon.</p>' };
    if (typeof defaults === 'string') {
      return defaults;
    }

    const normalizedLanguage = normalizeLanguage(language);
    return defaults[normalizedLanguage] || defaults.en || '<p>Content coming soon.</p>';
  }
}

export default new ContentService();
