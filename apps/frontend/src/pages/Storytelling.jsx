import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, PlayCircle, Lightbulb, FileCheck, Flame, Brain, Gift, Target, Heart, Quote } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '@/components/VideoPlayer';

function Storytelling() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, mediaRes] = await Promise.all([
        axios.get('/api/content/storytelling'),
        axios.get('/api/media/all')
      ]);
      setContent(contentRes.data.content);
      setMedia(mediaRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setContent('<h1>My Story</h1><p>Content coming soon...</p>');
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
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  const videoSections = [
    {
      id: 'video-story',
      title: 'My Story',
      description: 'The journey that brought me here and shaped my vision',
      icon: PlayCircle,
      gradient: 'from-purple-500 via-pink-500 to-red-500',
    },
    {
      id: 'video-proposal',
      title: 'My Proposal',
      description: 'What I want to build and how we can work together',
      icon: Lightbulb,
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    },
    {
      id: 'video-proof',
      title: 'Proof of Mind',
      description: 'Demonstrating my skills, experience, and dedication',
      icon: FileCheck,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    },
  ];

  return (
    <PageTransition className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent px-2">
            My Story
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium px-2">
            The journey that brought me here
          </p>
        </motion.div>

        {/* Video Sections */}
        <div className="space-y-8 mb-12">
          {videoSections.map((section, index) => {
            const Icon = section.icon;
            const videoData = media[section.id];
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Card variant="glass" size="lg" className="overflow-hidden">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Video Player */}
                  <VideoPlayer
                    src={videoData?.url}
                    showPlaceholder={true}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Personal Story Sections */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-8 text-gray-200">
            The Real Story
          </h2>

          <div className="space-y-6">
            {/* Story Card 1 - The Tooling Loop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" size="lg" className="border-l-4 border-l-orange-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-orange-400 mb-3">
                      The Tooling Loop
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      For months I've been fighting — not against people, but against an endless cycle of tools, tutorials, and broken builds. 
                      Bolt.ai, Cursor, n8n, countless frameworks... I've tried them all, desperate to find the one that would finally let me 
                      bring my ideas to life.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      Every day I sat for hours, searching, learning, watching tutorials, reading documentation. And every day I felt the gap 
                      between what my mind could envision and what my hands could build. It wasn't lack of effort — it was lack of the right 
                      bridge to cross from idea to execution.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Story Card 2 - Ideas vs Execution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" size="lg" className="border-l-4 border-l-purple-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-purple-400 mb-3">
                      Inventor, Not Developer
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Let me be clear: I don't underestimate developers' hard work. The skill, the patience, the years of learning — I have 
                      immense respect for it. But I've come to accept something about myself: I'm an inventor at heart.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      My strength is ideation — fast, deep, and constant. I see apps before they exist. I understand user flows intuitively. 
                      I can architect systems in my mind with all their edge cases and possibilities. What I lack is the technical execution 
                      to make them real.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="purple">Ideation</Badge>
                      <Badge variant="teal">Vision</Badge>
                      <Badge variant="mixed">Architecture</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Story Card 3 - The Give Away */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" size="lg" className="border-l-4 border-l-teal-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-teal-400 mb-3">
                      The Give Away
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      I was always scared of idea stealing. Afraid that if I shared my concepts, someone would take them and run. 
                      But months of struggling alone taught me something: ideas without execution are just dreams. And I can't execute alone.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      So this is my give away. Not a functional app (not yet), but an idea, a vision, a proof of mind. I have a mindmap 
                      for an app that helps people like me shape their ideas — a frontend combined with an n8n agent backend. I have concepts 
                      for life management tools. I have 90+ broken repos full of attempts and learnings.
                    </p>
                    <p className="text-gray-300 leading-relaxed italic">
                      If people want to support these projects, they're welcome to them. My ideas are my gift to those who believe.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Story Card 4 - This Project */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" size="lg" className="border-l-4 border-l-blue-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-blue-400 mb-3">
                      Why This Project Exists
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      The world is hard. Money is hard. And without being able to show and prove something tangible, nothing flips over. 
                      You can't convince investors with words. You can't attract co-founders with promises. You need proof.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      This project — along with two others I made with Bolt.ai and other tools — is my last remaining power channeled into 
                      something real. It's not perfect. It's not complete. But it exists. It runs. It shows what I'm capable of when I 
                      push through the frustration.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      I hope by showcasing this, I can still try to get an MVP out there. To prove that my mind can create something meaningful.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Story Card 5 - What I Hope For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="gradient" size="lg" className="bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-indigo-500/80 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">
                        What I Hope For
                      </h3>
                      <p className="text-white/90 leading-relaxed mb-4">
                        I'm looking for believers. Not believers in a finished product — that doesn't exist yet. 
                        But believers in a mind, in capabilities, in the potential of an inventor who just needs the right partnership.
                      </p>
                      <p className="text-white/80 leading-relaxed mb-4">
                        Many people around here can confirm: I spent months sitting for hours, desperately searching and learning, 
                        becoming deeply sad that my thoughts couldn't come alive. But I refused to let the new year begin without 
                        some positivity, without something to show.
                      </p>
                      <div className="bg-white/10 rounded-xl p-4 mt-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Quote className="w-5 h-5 text-white/70" />
                          <span className="text-sm font-semibold text-white/70">My promise</span>
                        </div>
                        <p className="text-white font-medium italic">
                          "If you believe in me, I will work tirelessly to prove you right. 
                          Together, we can flip the snowball from negative to positive."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Content Section (Dynamic from Database) */}
        {content && content !== '<h1>My Story</h1><p>Content coming soon...</p>' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-8 text-gray-200">
              More to Share
            </h2>
            <Card variant="glass" size="lg" className="sm:p-8 lg:p-12">
              <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none">
                <div 
                  className="story-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

export default Storytelling;
