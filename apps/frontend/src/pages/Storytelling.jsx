import { useState, useEffect } from 'react';
import axios from 'axios';

function Storytelling() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/storytelling');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent('<h1>My Story</h1><p>Content coming soon...</p>');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-purple dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
            My Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 font-medium">The journey that brought me here</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="story-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storytelling;
