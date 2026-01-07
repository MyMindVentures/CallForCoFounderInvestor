import { useState, useEffect } from 'react';
import axios from 'axios';
import DonationButton from '../components/DonationButton';

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
      console.error('Error fetching content:', error);
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
      console.error('Error recording donation:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-orange dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Financial Support
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 font-medium">Your support helps turn vision into reality</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="bg-gradient-orange rounded-2xl shadow-xl shadow-orange-500/30 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">Make a Donation</h2>
            <div className="glass-effect bg-white/95 dark:bg-dark-100/95 rounded-xl p-6 max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 dark:text-dark-600 mb-2">
                  Amount (EUR)
                </label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-300 rounded-lg focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-gray-800 dark:text-dark-700 text-lg bg-white dark:bg-dark-200"
                  min="1"
                  step="0.01"
                />
              </div>
              <DonationButton 
                amount={donationAmount} 
                onDonation={handleDonation}
              />
            </div>
            <p className="text-center mt-6 text-white/90 text-sm md:text-base font-medium">
              Donations are processed securely via Wise. Thank you for your support! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialHelp;
