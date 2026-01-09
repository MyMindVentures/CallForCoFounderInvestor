import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion } from 'framer-motion';
import { Loader2, Users, Lightbulb, MessageSquare, BarChart3, Sparkles, DollarSign, Target, Flame, Eye, Heart, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { assets } from '@/utils/assets';

function WhatILookFor() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/whatILookFor');
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent('<h1>What I Look For</h1><p>Content coming soon...</p>');
    } finally {
      setLoading(false);
    }
  };

  const obstacles = [
    { icon: Target, title: 'Lack of Clear Vision', description: 'Without a well-defined vision, teams struggle to align objectives. I bring clarity and direction to every project.', color: 'text-red-400' },
    { icon: MessageSquare, title: 'Poor Communication', description: 'Ineffective communication leads to misunderstandings and duplicated efforts. I prioritize transparent, open dialogue.', color: 'text-orange-400' },
    { icon: BarChart3, title: 'Insufficient Market Research', description: 'Thorough market research is fundamental. I\'ve done the research and understand our target audience deeply.', color: 'text-yellow-400' },
    { icon: Sparkles, title: 'Fear of Failure', description: 'Fear can stifle creativity. I embrace risk-taking and see failures as learning opportunities.', color: 'text-green-400' },
    { icon: DollarSign, title: 'Limited Resources', description: 'Constraints in time and funding can influence the ideation process. That\'s why I\'m seeking the right partners and investors.', color: 'text-blue-400' },
  ];

  const offerings = [
    { icon: Lightbulb, title: 'Vision & Strategy', description: 'Clear, compelling vision with a strategic roadmap to market' },
    { icon: Flame, title: 'Passion & Drive', description: 'Unstoppable determination to see this through to success' },
    { icon: Eye, title: 'Market Understanding', description: 'Deep knowledge of the market, audience, and opportunity' },
    { icon: Heart, title: 'Leadership', description: 'Natural ability to inspire, motivate, and lead teams' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
            What I Look For
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-medium px-2">
            Seeking investors and co-founders who understand the journey from idea to market
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
                The Idea-to-Market Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                Many entrepreneurs face a critical challenge: <strong className="text-white">having an amazing idea but struggling with the technical 
                skills needed to bring it to market.</strong> This is one of the most common reasons great innovations never see 
                the light of day.
              </p>
              
              <div className="backdrop-blur-md bg-blue-500/20 border-l-4 border-blue-400 p-6 rounded-r-xl">
                <p className="text-lg md:text-xl font-bold mb-2 text-blue-300">The Reality:</p>
                <p className="text-gray-200 font-medium">
                  Studies show that <strong className="text-white">42% of startups fail due to a lack of market demand</strong>, but equally important 
                  is the fact that many brilliant ideas never reach the market because the founder lacks the technical expertise 
                  to build the product or the resources to hire a team.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8">
                <motion.div 
                  className="backdrop-blur-md bg-blue-500/10 p-5 rounded-xl border border-blue-500/30"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                >
                  <h3 className="font-display font-bold text-blue-400 mb-3 text-lg sm:text-xl flex items-center gap-2">
                    <Target className="w-5 h-5" /> The Vision
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    I have a clear, compelling vision for a product that can make a real difference. The idea is validated, 
                    the market opportunity is clear, and the potential is enormous.
                  </p>
                </motion.div>
                <motion.div 
                  className="backdrop-blur-md bg-orange-500/10 p-5 rounded-xl border border-orange-500/30"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                >
                  <h3 className="font-display font-bold text-orange-400 mb-3 text-lg sm:text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> The Gap
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    While I excel at ideation, strategy, and vision, I need partners who can bridge the technical gap—developers, 
                    engineers, and technical co-founders who can turn ideas into reality.
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
              <CardTitle className="text-gradient-secondary">Common Obstacles on the Path</CardTitle>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6">What I Bring to the Table</h2>
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
                      Financial Support Partner
                    </CardTitle>
                    <p className="text-lg opacity-95 mt-2">
                      Temporary support now. Long-term upside later.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>Lifetime 20% revenue share (net)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>Transparent revenue dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>NDA + written agreement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">•</span>
                        <span>You&apos;re funding proof, not charity</span>
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
                      Solo Developer / Mentor
                    </CardTitle>
                    <p className="text-lg opacity-95 mt-2">
                      Be the bridge from architect to shipped product.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-base sm:text-lg">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>Revenue split per project</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>Daily short check-ins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>AI-native builder (Cursor, n8n, MCP)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-300 mt-1">•</span>
                        <span>Goal: Make me independent</span>
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
              <CardTitle className="text-gradient-primary">What I'm Looking For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Briefcase, title: 'Technical Co-Founders', description: 'Developers, engineers, and technical experts who can build the product and complement my vision with technical excellence.', color: 'border-indigo-500 bg-indigo-500/10' },
                { icon: DollarSign, title: 'Investors', description: 'Investors who understand that great ideas need the right team and resources to succeed. Those who see potential in visionaries who need technical support.', color: 'border-blue-500 bg-blue-500/10' },
                { icon: GraduationCap, title: 'Mentors & Advisors', description: 'Experienced entrepreneurs and advisors who can guide the journey from idea to market and help navigate the challenges.', color: 'border-purple-500 bg-purple-500/10' },
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
                  If you believe in the power of great ideas and want to be part of bringing one to market, let's connect. 
                  Together, we can bridge the gap between vision and reality.
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
