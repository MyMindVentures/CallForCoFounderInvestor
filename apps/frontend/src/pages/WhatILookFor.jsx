import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion } from 'framer-motion';
import { Users, Lightbulb, MessageSquare, BarChart3, Sparkles, DollarSign, Target, Flame, Eye, Heart, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { assets } from '@/utils/assets';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTranslation } from '@/i18n/useTranslation';

function WhatILookFor() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    fetchContent();
  }, [language]);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/whatILookFor', {
        params: { lang: language.toLowerCase() }
      });
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent('<h1>What I Look For</h1><p>Content coming soon...</p>');
    } finally {
      setLoading(false);
    }
  };

  const obstacles = [
    { icon: Target, title: t('pages.whatILookFor.obstacles.lackOfVision.title'), description: t('pages.whatILookFor.obstacles.lackOfVision.description'), color: 'text-red-400' },
    { icon: MessageSquare, title: t('pages.whatILookFor.obstacles.poorCommunication.title'), description: t('pages.whatILookFor.obstacles.poorCommunication.description'), color: 'text-orange-400' },
    { icon: BarChart3, title: t('pages.whatILookFor.obstacles.insufficientResearch.title'), description: t('pages.whatILookFor.obstacles.insufficientResearch.description'), color: 'text-yellow-400' },
    { icon: Sparkles, title: t('pages.whatILookFor.obstacles.fearOfFailure.title'), description: t('pages.whatILookFor.obstacles.fearOfFailure.description'), color: 'text-green-400' },
    { icon: DollarSign, title: t('pages.whatILookFor.obstacles.limitedResources.title'), description: t('pages.whatILookFor.obstacles.limitedResources.description'), color: 'text-blue-400' },
  ];

  const offerings = [
    { icon: Lightbulb, title: t('pages.whatILookFor.whatIBring.vision.title'), description: t('pages.whatILookFor.whatIBring.vision.description') },
    { icon: Flame, title: t('pages.whatILookFor.whatIBring.passion.title'), description: t('pages.whatILookFor.whatIBring.passion.description') },
    { icon: Eye, title: t('pages.whatILookFor.whatIBring.marketUnderstanding.title'), description: t('pages.whatILookFor.whatIBring.marketUnderstanding.description') },
    { icon: Heart, title: t('pages.whatILookFor.whatIBring.leadership.title'), description: t('pages.whatILookFor.whatIBring.leadership.description') },
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
        src={assets.backgrounds.dividerGradient}
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            >
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 sm:mb-4 gradient-text-animated px-2">
            {t('pages.whatILookFor.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-medium px-2">
            {t('pages.whatILookFor.subtitle')}
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

        {/* The Challenge Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gradient-accent">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                {t('pages.whatILookFor.challenge.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                {t('pages.whatILookFor.challenge.description')}
              </p>
              
              <div className="backdrop-blur-md bg-blue-500/20 border-l-4 border-blue-400 p-6 rounded-r-xl">
                <p className="text-lg md:text-xl font-bold mb-2 text-blue-300">{t('pages.whatILookFor.challenge.reality.title')}</p>
                <p className="text-gray-200 font-medium">
                  {t('pages.whatILookFor.challenge.reality.text')}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8">
                <motion.div 
                  className="backdrop-blur-md bg-blue-500/10 p-5 rounded-xl border border-blue-500/30"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                >
                  <h3 className="font-display font-bold text-blue-400 mb-3 text-lg sm:text-xl flex items-center gap-2">
                    <Target className="w-5 h-5" /> {t('pages.whatILookFor.challenge.vision.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {t('pages.whatILookFor.challenge.vision.description')}
                  </p>
                </motion.div>
                <motion.div 
                  className="backdrop-blur-md bg-orange-500/10 p-5 rounded-xl border border-orange-500/30"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                >
                  <h3 className="font-display font-bold text-orange-400 mb-3 text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> {t('pages.whatILookFor.challenge.gap.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {t('pages.whatILookFor.challenge.gap.description')}
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Common Obstacles Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="text-gradient-secondary">{t('pages.whatILookFor.obstacles.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="space-y-4">
                {obstacles.map((item, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      className="flex items-start space-x-4 p-4 rounded-xl backdrop-blur-sm bg-dark-300/30 border border-dark-400/50"
                      whileHover={{ x: 4, borderColor: 'rgba(20, 184, 166, 0.3)' }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 backdrop-blur-md bg-dark-300/50 rounded-full flex items-center justify-center">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-100">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* What I Bring Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card 
            variant="gradient"
            size="lg"
            className="bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-purple-500/80 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">{t('pages.whatILookFor.whatIBring.title')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {offerings.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="backdrop-blur-md bg-white/10 p-5 rounded-xl border border-white/20"
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </h3>
                    <p className="font-medium text-white/90">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </ScrollReveal>

        {/* Partnership Structure Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Financial Support Partner */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="gradient" size="lg" className="bg-gradient-to-br from-yellow-500/80 via-orange-500/80 to-red-500/80 text-white relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-3">
                      <img src={assets.icons.investor} alt="Investor" className="w-8 h-8" />
                      {t('pages.whatILookFor.partnershipStructure.financialPartner.title')}
                    </CardTitle>
                    <p className="text-lg opacity-95 mt-2">
                      {t('pages.whatILookFor.partnershipStructure.financialPartner.subtitle')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.financialPartner.items.revenueShare')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.financialPartner.items.dashboard')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.financialPartner.items.nda')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.financialPartner.items.fundingProof')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </motion.div>

            {/* Solo Developer / Mentor */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="gradient" size="lg" className="bg-gradient-to-br from-emerald-500/80 via-teal-500/80 to-cyan-500/80 text-white relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-3">
                      <img src={assets.icons.cofounder} alt="CoFounder" className="w-8 h-8" />
                      {t('pages.whatILookFor.partnershipStructure.soloDeveloper.title')}
                    </CardTitle>
                    <p className="text-lg opacity-95 mt-2">
                      {t('pages.whatILookFor.partnershipStructure.soloDeveloper.subtitle')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.soloDeveloper.items.revenueSplit')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.soloDeveloper.items.dailyCheckins')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.soloDeveloper.items.aiNative')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>{t('pages.whatILookFor.partnershipStructure.soloDeveloper.items.goal')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* What I'm Looking For Section */}
        <ScrollReveal>
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="text-gradient-primary">{t('pages.whatILookFor.lookingFor.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Briefcase, title: t('pages.whatILookFor.lookingFor.technicalCoFounders.title'), description: t('pages.whatILookFor.lookingFor.technicalCoFounders.description'), color: 'border-indigo-500 bg-indigo-500/10' },
                { icon: DollarSign, title: t('pages.whatILookFor.lookingFor.investors.title'), description: t('pages.whatILookFor.lookingFor.investors.description'), color: 'border-blue-500 bg-blue-500/10' },
                { icon: GraduationCap, title: t('pages.whatILookFor.lookingFor.mentors.title'), description: t('pages.whatILookFor.lookingFor.mentors.description'), color: 'border-purple-500 bg-purple-500/10' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`border-l-4 ${item.color} pl-6 p-4 rounded-r-xl backdrop-blur-sm`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <h3 className="font-display font-bold text-xl mb-2 text-gray-100 flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-8 backdrop-blur-md bg-gradient-to-r from-indigo-500/20 to-blue-500/20 p-6 rounded-xl border border-indigo-500/30"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-lg md:text-xl text-gray-200 font-bold">
                  {t('pages.whatILookFor.lookingFor.footer')}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}

export default WhatILookFor;
