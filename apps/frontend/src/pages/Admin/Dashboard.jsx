import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('content');
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState(null);
  const [selectedPage, setSelectedPage] = useState('storytelling');
  const [pageContent, setPageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pages = [
    { id: 'storytelling', name: 'Storytelling' },
    { id: 'whatILookFor', name: 'What I Look For' },
    { id: 'developerHelp', name: 'Developer Help' },
    { id: 'financialHelp', name: 'Financial Help' },
    { id: 'support', name: 'Support' },
    { id: 'adhDAries', name: 'ADHD + Aries' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (activeTab === 'messages') {
      fetchMessages();
    } else if (activeTab === 'donations') {
      fetchDonations();
    } else if (activeTab === 'content') {
      fetchContent(selectedPage);
    }
  }, [activeTab, selectedPage, navigate]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const fetchContent = async (pageId) => {
    try {
      const response = await axios.get(`/api/content/${pageId}`);
      setPageContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleContentChange = (e) => {
    setPageContent(e.target.value);
  };

  const saveContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `/api/content/${selectedPage}`,
        { content: pageContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const curateMessage = async (messageId, isPositive, isPublished) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `/api/messages/${messageId}/curate`,
        { isPositive, isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (error) {
      console.error('Error curating message:', error);
      alert('Error updating message. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'content', label: 'Content Management' },
              { id: 'messages', label: `Messages (${messages.length})` },
              { id: 'donations', label: 'Donations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Page:
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => {
                    setSelectedPage(e.target.value);
                    fetchContent(e.target.value);
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                >
                  {pages.map(page => (
                    <option key={page.id} value={page.id}>{page.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content (HTML):
                </label>
                <textarea
                  value={pageContent}
                  onChange={handleContentChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none font-mono text-sm"
                  rows="15"
                  placeholder="Enter HTML content here..."
                />
              </div>

              <button
                onClick={saveContent}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? 'Saving...' : 'Save Content'}
              </button>

              {pageContent && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-3">Preview:</h3>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageContent }} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">All Messages</h2>
              {messages.length === 0 ? (
                <p className="text-gray-600">No messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id || msg._id} className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <strong className="text-lg text-gray-800">{msg.name}</strong>
                          <span className="text-gray-600 ml-2">({msg.email})</span>
                          {msg.donationAmount && (
                            <span className="ml-3 inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                              €{msg.donationAmount.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <small className="text-gray-500 mt-1 sm:mt-0">
                          {new Date(msg.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <p className="text-gray-700 mb-4">{msg.message}</p>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={msg.isPositive || false}
                            onChange={(e) => curateMessage(msg.id || msg._id, e.target.checked, msg.isPublished || false)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700 font-medium">Positive</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={msg.isPublished || false}
                            onChange={(e) => curateMessage(msg.id || msg._id, msg.isPositive || false, e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700 font-medium">Publish</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'donations' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Donations Overview</h2>
              {donations ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Donations</h3>
                      <p className="text-3xl font-bold text-green-600">€{donations.stats.total.toFixed(2)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">Number of Donations</h3>
                      <p className="text-3xl font-bold text-blue-600">{donations.stats.count}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Donation</h3>
                      <p className="text-3xl font-bold text-purple-600">€{donations.stats.average.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Donations</h3>
                    {donations.donations.length === 0 ? (
                      <p className="text-gray-600">No donations yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {donations.donations.map(donation => (
                              <tr key={donation.id || donation._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(donation.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {donation.donorName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {donation.donorEmail}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                  €{donation.amount.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Loading donations...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
