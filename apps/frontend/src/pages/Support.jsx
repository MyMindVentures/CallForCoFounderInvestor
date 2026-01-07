import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from '../components/MessageForm';

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
      console.error('Error fetching content:', error);
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
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = () => {
    fetchMessages();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-blue dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 text-gradient-accent">
            Support & Messages
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 font-medium">Your words of encouragement mean the world</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-800 dark:text-dark-700">Support Messages</h2>
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-600 text-lg">
                No messages yet. Be the first to show your support!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id || msg._id}
                  className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-6 border-l-4 border-cyan-500 dark:border-cyan-400 shadow-md hover:shadow-lg dark:shadow-dark-900/50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <strong className="text-lg md:text-xl text-gray-800 dark:text-dark-700 mb-2 sm:mb-0 font-display font-bold">
                      {msg.name}
                    </strong>
                    {msg.donationAmount && (
                      <span className="inline-flex items-center px-4 py-1 bg-gradient-orange text-white rounded-full text-sm font-semibold shadow-lg shadow-orange-500/50">
                        💰 Donated €{msg.donationAmount.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-dark-600 mb-3 leading-relaxed text-base md:text-lg">{msg.message}</p>
                  <small className="text-gray-500 dark:text-dark-400 text-sm font-medium">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-800 dark:text-dark-700">Send a Message</h2>
          <div className="bg-gradient-to-br from-gray-50 to-cyan-50/50 dark:from-dark-200 dark:to-dark-300 rounded-xl p-6 border-2 border-cyan-200 dark:border-cyan-700/50 shadow-md">
            <MessageForm onSubmit={handleMessageSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
