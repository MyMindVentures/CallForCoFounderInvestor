import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, HelpCircle, ChevronDown, ChevronUp, Users, DollarSign, Calendar, Bot, Target, ArrowRight } from 'lucide-react';
import { PageTransition, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MessageForm from '@/components/MessageForm';
import { assets } from '@/utils/assets';
import { useLanguage } from '@/i18n/LanguageContext';

function DeveloperHelp() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetchContent();
  }, [language]);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/developerHelp', {
        params: { lang: language.toLowerCase() }
      });
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent('<h1>Developer Help</h1><p>Need help with IDEs, n8n, and Vibe Coding learning.</p>');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={assets.ui.loadingSpinner}
            alt=""
            className="w-12 h-12 mx-auto mb-4 animate-spin"
            aria-hidden="true"
          />
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <img
        src={assets.backgrounds.developer}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto">
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
              <Code className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent px-2">
            Developer Help
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium px-2">
            IDEs, n8n, Vibe Coding & Daily Learning Support
          </p>
        </motion.div>

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

        {/* Solo Developer / Mentor Partnership Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="gradient" size="xl" className="bg-gradient-to-br from-emerald-500/80 via-teal-500/80 to-cyan-500/80 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10" />
                  Solo Developer / Mentor
                </CardTitle>
                <p className="text-lg sm:text-xl opacity-95 mt-2">
                  Be the bridge from architect to shipped product.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg mb-6 opacity-90">
                  I&apos;m looking for a developer/mentor who can help me bridge the gap between vision and execution. Here&apos;s what the partnership looks like:
                </p>
                
                <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    {
                      icon: DollarSign,
                      title: 'Revenue Split Per Project',
                      description: 'Fair revenue sharing based on each project we ship together. Your contribution directly impacts your return.',
                      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
                    },
                    {
                      icon: Calendar,
                      title: 'Daily Short Check-ins',
                      description: 'Quick daily syncs to keep momentum, solve blockers, and maintain progress. Efficient and focused.',
                      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                    },
                    {
                      icon: Bot,
                      title: 'AI-Native Builder',
                      description: 'We work with modern AI tools: Cursor, n8n, MCP. You help me leverage these tools effectively.',
                      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
                    },
                    {
                      icon: Target,
                      title: 'Goal: Make Me Independent',
                      description: 'Your ultimate goal is to teach and mentor me until I can ship products independently. Empowerment, not dependency.',
                      color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={index}>
                        <motion.div
                          className={`backdrop-blur-md bg-gradient-to-br ${item.color} p-5 rounded-xl border`}
                          whileHover={{ scale: 1.03, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-lg sm:text-xl mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
                
                <div className="mt-8 backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20">
                  <p className="text-lg sm:text-xl font-bold mb-2">
                    The Bridge
                  </p>
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                    My strength is ideation and architecture. Your strength is execution and shipping. Together, we turn ideas into reality. 
                    You&apos;re not just coding—you&apos;re teaching me to become independent while we build something meaningful.
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card variant="glass" size="lg">
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-100 mb-3 sm:mb-4">
                Need Instant Help?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 px-2">
                Whether you&apos;re helping with IDEs, n8n workflows, or Vibe Coding tutorials, 
                your support makes a huge difference.
              </p>
              
              <Button
                onClick={() => setShowForm(!showForm)}
                variant={showForm ? 'glass' : 'default'}
                size="lg"
              >
                {showForm ? (
                  <>
                    Hide Contact Form
                    <ChevronUp className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Get Instant Help
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 backdrop-blur-md bg-dark-300/50 rounded-xl border border-emerald-500/20">
                    <MessageForm />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default DeveloperHelp;
