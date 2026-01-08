import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Code, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MessageForm from '@/components/MessageForm';

function DeveloperHelp() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/developerHelp');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
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
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
                Whether you're helping with IDEs, n8n workflows, or Vibe Coding tutorials, 
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
