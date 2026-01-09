import { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '@/utils/logger';
import { motion } from 'framer-motion';
import { Loader2, DollarSign, Heart, FileText, BarChart3, Shield, Sparkles } from 'lucide-react';
import { PageTransition, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import DonationButton from '@/components/DonationButton';

function FinancialHelp() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/financialHelp');
      setContent(response.data.content);
    } catch (error) {
      logger.error('Error fetching content:', error);
      setContent('<h1>Financial Support</h1><p>Your support helps me continue this journey.</p>');
    } finally {
      setLoading(false);
    }
  };

  const handleDonation = async (amount, donorName, donorEmail) => {
    try {
      await axios.post('/api/donations', {
        amount: parseFloat(amount),
        currency: 'EUR',
        donorName,
        donorEmail
      });
    } catch (error) {
      logger.error('Error recording donation:', error);
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
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
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
              <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent px-2">
            Financial Support
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium px-2">
            Your support helps turn vision into reality
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

        {/* Financial Support Partner Section */}
        <ScrollReveal className="mb-6 sm:mb-8">
          <Card variant="gradient" size="xl" className="bg-gradient-to-br from-yellow-500/80 via-orange-500/80 to-red-500/80 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10" />
                  Financial Support Partner
                </CardTitle>
                <p className="text-lg sm:text-xl opacity-95 mt-2">
                  Temporary support now. Long-term upside later.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg mb-6 opacity-90">
                  You&apos;re funding proof, not charity. Here&apos;s what I offer in return:
                </p>
                
                <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    {
                      icon: DollarSign,
                      title: 'Lifetime 20% Revenue Share',
                      description: 'Net revenue share for life. Transparent, fair, and long-term.',
                      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
                    },
                    {
                      icon: BarChart3,
                      title: 'Transparent Revenue Dashboard',
                      description: 'Full visibility into revenue streams and financial performance.',
                      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                    },
                    {
                      icon: FileText,
                      title: 'NDA + Written Agreement',
                      description: 'Professional legal framework protecting both parties.',
                      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
                    },
                      {
                        icon: Sparkles,
                        title: 'Funding Proof, Not Charity',
                        description: "You're investing in potential and execution, not giving handouts.",
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
              </CardContent>
            </div>
          </Card>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card 
            variant="gradient"
            size="xl"
            className="bg-gradient-to-br from-yellow-500/90 via-orange-500/90 to-red-500/90 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6 text-center">
                Make a Donation
              </h2>
              
              <motion.div 
                className="backdrop-blur-xl bg-dark-200/80 rounded-xl p-4 sm:p-5 md:p-6 max-w-md mx-auto border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">
                  <Label htmlFor="amount" className="block text-sm font-semibold text-gray-200 mb-2">
                    Amount (EUR)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    variant="glow"
                    size="lg"
                    min="1"
                    step="0.01"
                  />
                </div>
                <DonationButton 
                  amount={donationAmount} 
                  onDonation={handleDonation}
                />
              </motion.div>
              
              <p className="text-center mt-4 sm:mt-6 text-white/90 text-xs sm:text-sm md:text-base font-medium px-2">
                Donations are processed securely via Wise. Thank you for your support! 🙏
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default FinancialHelp;
