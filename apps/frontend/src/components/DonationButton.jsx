import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logger from '@/utils/logger';
import { CreditCard, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function DonationButton({ amount, onDonation }) {
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const wisePaymentUrl = import.meta.env.VITE_WISE_PAYMENT_URL || 'https://wise.com/pay';

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    if (!donorName || !donorEmail) {
      setShowForm(true);
      return;
    }

    setLoading(true);

    try {
      // Record donation
      if (onDonation) {
        await onDonation(amount, donorName, donorEmail);
      }

      // Redirect to Wise payment
      const paymentUrl = new URL(wisePaymentUrl);
      paymentUrl.searchParams.set('amount', amount);
      paymentUrl.searchParams.set('currency', 'EUR');
      window.open(paymentUrl.toString(), '_blank');
    } catch (error) {
      logger.error('Error processing donation:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (donorName && donorEmail) {
      handleDonate();
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.form 
            key="form"
            onSubmit={handleFormSubmit} 
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="donorName" className="sr-only">Your Name</Label>
              <Input
                type="text"
                id="donorName"
                placeholder="Your Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
                variant="default"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Label htmlFor="donorEmail" className="sr-only">Your Email</Label>
              <Input
                type="email"
                id="donorEmail"
                placeholder="Your Email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
                variant="default"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                type="submit"
                disabled={loading}
                variant="warning"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Continue to Wise
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleDonate}
              disabled={loading || !amount || parseFloat(amount) <= 0}
              variant="warning"
              size="lg"
              glow={amount && parseFloat(amount) > 0 ? 'pulse' : 'none'}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Donate via Wise
                </span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DonationButton;
