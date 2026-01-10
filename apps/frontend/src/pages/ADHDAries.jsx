import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Lightbulb, Rocket, RefreshCw, Crown, Sword, Battery, Star, Flame } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { assets } from '@/utils/assets';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslation } from '@/i18n/useTranslation';

function ADHDAries() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    fetchContent();
  }, [language]);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/adhDAries', {
        params: { lang: language.toLowerCase() }
      });
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent(`
        <div class="prose prose-lg max-w-none">
          <h1 class="text-3xl md:text-4xl font-bold mb-6 text-red-600">ADHD + Aries: A Powerful Combination</h1>
          <p class="text-lg md:text-xl text-gray-700 mb-8">Understanding the unique strengths that come from combining ADHD traits with Aries zodiac characteristics.</p>
        </div>
      `);
    } finally {
      setLoading(false);
    }
  };

  const adhdTraits = [
    { icon: Zap, title: t('pages.adhdAries.adhdTraits.hyperfocus.title'), description: t('pages.adhdAries.adhdTraits.hyperfocus.description'), color: 'from-red-500/20 to-red-600/20 border-red-500/30' },
    { icon: Lightbulb, title: t('pages.adhdAries.adhdTraits.creativeThinking.title'), description: t('pages.adhdAries.adhdTraits.creativeThinking.description'), color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
    { icon: Rocket, title: t('pages.adhdAries.adhdTraits.highEnergy.title'), description: t('pages.adhdAries.adhdTraits.highEnergy.description'), color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' },
    { icon: RefreshCw, title: t('pages.adhdAries.adhdTraits.adaptability.title'), description: t('pages.adhdAries.adhdTraits.adaptability.description'), color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  ];

  const ariesTraits = [
    { icon: Crown, title: t('pages.adhdAries.ariesTraits.naturalLeadership.title'), description: t('pages.adhdAries.ariesTraits.naturalLeadership.description'), color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
    { icon: Sword, title: t('pages.adhdAries.ariesTraits.fearlessInitiative.title'), description: t('pages.adhdAries.ariesTraits.fearlessInitiative.description'), color: 'from-red-500/20 to-red-600/20 border-red-500/30' },
    { icon: Battery, title: t('pages.adhdAries.ariesTraits.unstoppableDrive.title'), description: t('pages.adhdAries.ariesTraits.unstoppableDrive.description'), color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' },
    { icon: Star, title: t('pages.adhdAries.ariesTraits.competitiveSpirit.title'), description: t('pages.adhdAries.ariesTraits.competitiveSpirit.description'), color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img
            src={assets.ui.loadingSpinner}
            alt=""
            className="w-12 h-12 mx-auto mb-4 animate-spin"
            aria-hidden="true"
          />
          <p className="text-gray-400">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <img
        src={assets.backgrounds.adhd}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
            </motion.div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent px-2">
            {t('pages.adhdAries.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-medium px-2">
            {t('pages.adhdAries.subtitle')}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Card variant="glass" size="lg">
            <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </Card>
        </motion.div>

        {/* ADHD Traits Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gradient-secondary">
                <Zap className="w-8 h-8 text-yellow-400" />
                {t('pages.adhdAries.adhdSection.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                {t('pages.adhdAries.adhdSection.description')}
              </p>
              
              <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-6">
                {adhdTraits.map((trait, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      className={`backdrop-blur-md bg-gradient-to-br ${trait.color} p-5 rounded-xl border`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-display font-bold text-gray-100 mb-2 text-lg sm:text-xl flex items-center gap-2">
                        <trait.icon className="w-5 h-5 text-yellow-400" />
                        {trait.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {trait.description}
                      </p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Aries Traits Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gradient-accent">
                <Flame className="w-8 h-8 text-red-400" />
                {t('pages.adhdAries.ariesSection.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                {t('pages.adhdAries.ariesSection.description')}
              </p>
              
              <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-6">
                {ariesTraits.map((trait, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      className={`backdrop-blur-md bg-gradient-to-br ${trait.color} p-5 rounded-xl border`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-display font-bold text-gray-100 mb-2 text-lg sm:text-xl flex items-center gap-2">
                        <trait.icon className="w-5 h-5 text-orange-400" />
                        {trait.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {trait.description}
                      </p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Combined Power Section */}
        <ScrollReveal>
          <Card 
            variant="gradient"
            size="lg"
            className="bg-gradient-to-br from-red-500/90 via-orange-500/90 to-yellow-500/90 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                {t('pages.adhdAries.combinedPower.title')}
              </h2>
              <div className="space-y-4 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                <p>
                  {t('pages.adhdAries.combinedPower.description')}
                </p>
                <motion.ul 
                  className="space-y-3 ml-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {[
                    { title: t('pages.adhdAries.combinedPower.items.rapidInnovation.title'), desc: t('pages.adhdAries.combinedPower.items.rapidInnovation.description') },
                    { title: t('pages.adhdAries.combinedPower.items.naturalEntrepreneurship.title'), desc: t('pages.adhdAries.combinedPower.items.naturalEntrepreneurship.description') },
                    { title: t('pages.adhdAries.combinedPower.items.resilience.title'), desc: t('pages.adhdAries.combinedPower.items.resilience.description') },
                    { title: t('pages.adhdAries.combinedPower.items.inspiringLeadership.title'), desc: t('pages.adhdAries.combinedPower.items.inspiringLeadership.description') },
                    { title: t('pages.adhdAries.combinedPower.items.breakthroughThinking.title'), desc: t('pages.adhdAries.combinedPower.items.breakthroughThinking.description') },
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span><strong className="font-bold">{item.title}:</strong> {item.desc}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.p 
                  className="mt-6 font-bold text-xl md:text-2xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {t('pages.adhdAries.combinedPower.footer')}
                </motion.p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}

export default ADHDAries;
