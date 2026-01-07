import { useState } from 'react';
import axios from 'axios';

function DonationButton({ amount, onDonation }) {
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const wisePaymentUrl = process.env.REACT_APP_WISE_PAYMENT_URL || 'https://wise.com/pay';

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
      const paymentUrl = `${wisePaymentUrl}?amount=${amount}&currency=EUR`;
      window.open(paymentUrl, '_blank');
    } catch (error) {
      console.error('Error processing donation:', error);
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
      {showForm && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-gray-800"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? 'Processing...' : 'Continue to Wise'}
          </button>
        </form>
      )}

      {!showForm && (
        <button
          onClick={handleDonate}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
            loading || !amount || parseFloat(amount) <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Donate via Wise'
          )}
        </button>
      )}
    </div>
  );
}

export default DonationButton;
