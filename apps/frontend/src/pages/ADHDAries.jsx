import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Zap, Lightbulb, Rocket, RefreshCw, Crown, Sword, Battery, Star, Flame } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function ADHDAries() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/adhDAries');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
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
    { icon: Zap, title: 'Hyperfocus', description: 'When an ADHD person finds something that truly interests them, they can achieve an intense level of concentration that allows for breakthrough thinking and rapid problem-solving.', color: 'from-red-500/20 to-red-600/20 border-red-500/30' },
    { icon: Lightbulb, title: 'Creative Thinking', description: 'ADHD minds are naturally creative, constantly generating new ideas and seeing patterns that others don\'t. This divergent thinking is essential for innovation.', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
    { icon: Rocket, title: 'High Energy', description: 'The high energy levels associated with ADHD can fuel long work sessions and maintain momentum through challenging projects.', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' },
    { icon: RefreshCw, title: 'Adaptability', description: 'ADHD individuals excel at pivoting quickly, adapting to new situations, and thinking on their feet—all crucial skills in the fast-paced startup world.', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  ];

  const ariesTraits = [
    { icon: Crown, title: 'Natural Leadership', description: 'Aries are born leaders, confident in their decisions and unafraid to take charge. They inspire others with their passion and determination.', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
    { icon: Sword, title: 'Fearless Initiative', description: 'Aries don\'t wait for permission—they act. This boldness is essential for entrepreneurs who need to move quickly and seize opportunities.', color: 'from-red-500/20 to-red-600/20 border-red-500/30' },
    { icon: Battery, title: 'Unstoppable Drive', description: 'The Aries drive is relentless. Once they set their sights on a goal, nothing can stop them from achieving it.', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' },
    { icon: Star, title: 'Competitive Spirit', description: 'Aries thrive on competition and challenges. They\'re motivated by the desire to be first, to win, and to prove themselves.', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
            </motion.div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent px-2">
            ADHD + Aries: A Powerful Combination
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-medium px-2">
            Understanding the unique strengths that come from combining ADHD traits with Aries zodiac characteristics
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
                ADHD: The Superpower of Hyperfocus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                ADHD is often misunderstood as a limitation, but for entrepreneurs and innovators, it can be a powerful asset. 
                The ADHD brain operates differently—with heightened creativity, rapid idea generation, and the ability to see 
                connections others miss.
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
                Aries: The Fire Sign Leadership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300">
                As the first sign of the zodiac, Aries represents new beginnings, leadership, and fearless initiative. 
                Aries individuals are natural pioneers, unafraid to take risks and blaze new trails.
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
                The Combined Power
              </h2>
              <div className="space-y-4 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                <p>
                  When ADHD's hyperfocus and creative thinking combine with Aries' leadership and fearless initiative, 
                  you get an unstoppable force for innovation. This combination creates:
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
                    { title: 'Rapid Innovation', desc: 'The ability to generate ideas quickly and execute them fearlessly' },
                    { title: 'Natural Entrepreneurship', desc: 'A perfect blend of vision, energy, and action' },
                    { title: 'Resilience', desc: 'The determination to push through challenges and setbacks' },
                    { title: 'Inspiring Leadership', desc: 'The charisma to rally others around a vision' },
                    { title: 'Breakthrough Thinking', desc: 'Seeing solutions where others see problems' },
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
                  This unique combination is why I'm seeking partners who understand that different thinking isn't a weakness—it's 
                  a superpower that can change the world.
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
