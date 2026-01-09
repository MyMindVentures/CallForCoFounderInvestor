import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Heart, Mail, Phone } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MessageForm from '@/components/MessageForm';
import { assets } from '@/utils/assets';

function Support() {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
    fetchMessages();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/support');
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent('<h1>Support</h1><p>Thank you for your support!</p>');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages/public');
      setMessages(response.data);
    } catch (error) {
      logger.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = () => {
    fetchMessages();
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
        src={assets.backgrounds.starsSubtle}
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
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 sm:mb-4 text-gradient-accent px-2">
            Support & Messages
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium px-2">
            Your words of encouragement mean the world
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

        {/* Contact Information Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="gradient" size="lg" className="bg-gradient-to-br from-cyan-500/80 via-blue-500/80 to-indigo-500/80 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-3">
                  <MessageSquare className="w-8 h-8" />
                  Get in Touch
                </CardTitle>
                <p className="text-lg opacity-95 mt-2">
                  Or simply reach out directly
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <motion.a
                    href="mailto:hello@mymindventures.io"
                    className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg mb-1">Email</h3>
                        <p className="text-sm opacity-90">hello@mymindventures.io</p>
                      </div>
                    </div>
                    <Button variant="glassFrost" size="sm" className="w-full mt-4">
                      Send Email
                    </Button>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/34643037346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg mb-1">WhatsApp</h3>
                        <p className="text-sm opacity-90">+34 643 037 346 (NL + EN)</p>
                      </div>
                    </div>
                    <Button variant="glassFrost" size="sm" className="w-full mt-4">
                      Open WhatsApp
                    </Button>
                  </motion.a>
                </div>
              </CardContent>
            </div>
          </Card>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-cyan-400" />
                Support Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <img
                    src={assets.ui.emptyState}
                    alt=""
                    className="w-20 h-20 mx-auto mb-4 opacity-70"
                    aria-hidden="true"
                  />
                  <p className="text-gray-400 text-lg">
                    No messages yet. Be the first to show your support!
                  </p>
                </div>
              ) : (
                <StaggerContainer className="space-y-4">
                  {messages.map((msg) => (
                    <StaggerItem key={msg.id || msg._id}>
                      <motion.div
                        className="backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-5 border-l-4 border-cyan-500 hover:bg-cyan-500/20 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <strong className="text-lg md:text-xl text-gray-100 mb-2 sm:mb-0 font-display font-bold">
                            {msg.name}
                          </strong>
                          {msg.donationAmount && (
                            <Badge variant="warning" size="default" className="flex items-center gap-1">
                              💰 Donated €{msg.donationAmount.toFixed(2)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed text-base md:text-lg">
                          {msg.message}
                        </p>
                        <small className="text-gray-500 text-sm font-medium">
                          {new Date(msg.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </small>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card variant="glass" size="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Send className="w-6 h-6 text-cyan-400" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="backdrop-blur-md bg-dark-300/50 rounded-xl p-4 sm:p-5 md:p-6 border border-cyan-500/20">
                <MessageForm onSubmit={handleMessageSubmit} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default Support;
