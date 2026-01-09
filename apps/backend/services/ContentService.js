import contentRepository from '../repositories/ContentRepository.js';

const defaultContent = {
  landing: '<h1>Welcome</h1><p>Welcome to our platform.</p>',
  storytelling: '<h1>My Story</h1><p>Share your story here.</p>',
  whatILookFor: '<h1>What I Look For</h1><p>Looking for investors and co-founders.</p>',
  developerHelp: '<h1>Developer Help</h1><p>Need help with IDEs, n8n, and Vibe Coding.</p>',
  financialHelp: '<h1>Financial Support</h1><p>Support our mission.</p>',
  support: '<h1>Support</h1><p>Thank you for your support!</p>',
  adhDAries: '<h1>ADHD + Aries</h1><p>The importance of ADHD combined with Aries strengths.</p>',
  qrRedirectUrl: process.env.APP_URL || 'https://example.com'
};

class ContentService {
  async getContent(pageId) {
    let content = await contentRepository.findOne({ pageId });
    
    // If content doesn't exist, create default
    if (!content) {
      content = await contentRepository.create({
        pageId,
        content: defaultContent[pageId] || '<p>Content coming soon.</p>'
      });
    }

    return content;
  }

  async updateContent(pageId, contentData, updatedBy) {
    return await contentRepository.findOneAndUpdate(
      { pageId },
      { 
        content: contentData.content,
        updatedBy
      },
      { upsert: true }
    );
  }

  getDefaultContent(pageId) {
    return defaultContent[pageId] || '<p>Content coming soon.</p>';
  }
}

export default new ContentService();
