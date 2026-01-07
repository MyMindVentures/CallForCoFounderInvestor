import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from '../components/MessageForm';

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-forest dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Developer Help
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 font-medium">IDEs, n8n, Vibe Coding & Daily Learning Support</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-dark-700 mb-4">Need Instant Help?</h2>
            <p className="text-gray-600 dark:text-dark-500 mb-6 text-lg">
              Whether you're helping with IDEs, n8n workflows, or Vibe Coding tutorials, 
              your support makes a huge difference.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                showForm
                  ? 'bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-dark-600 hover:bg-gray-300 dark:hover:bg-dark-400'
                  : 'btn-gradient shadow-glow transform hover:scale-105'
              }`}
            >
              {showForm ? 'Hide Contact Form' : 'Get Instant Help'}
            </button>
          </div>

          {showForm && (
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-green-50/50 dark:from-dark-200 dark:to-dark-300 rounded-xl border-2 border-green-200 dark:border-green-700/50 shadow-md">
              <MessageForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeveloperHelp;
