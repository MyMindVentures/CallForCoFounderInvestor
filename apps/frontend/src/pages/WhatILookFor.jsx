import { useState, useEffect } from 'react';
import axios from 'axios';

function WhatILookFor() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/whatILookFor');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent('<h1>What I Look For</h1><p>Content coming soon...</p>');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-ocean dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 gradient-text-animated">
            What I Look For
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 max-w-2xl mx-auto font-medium">
            Seeking investors and co-founders who understand the journey from idea to market
          </p>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        {/* The Challenge Section */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient-accent flex items-center">
            <span className="mr-3 text-4xl">💡</span>
            The Idea-to-Market Challenge
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-dark-600">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              Many entrepreneurs face a critical challenge: <strong className="font-bold">having an amazing idea but struggling with the technical 
              skills needed to bring it to market.</strong> This is one of the most common reasons great innovations never see 
              the light of day.
            </p>
            
            <div className="bg-gradient-blue dark:bg-gradient-dark border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-lg text-white shadow-lg">
              <p className="text-lg md:text-xl font-bold mb-2">The Reality:</p>
              <p className="text-white/95 font-medium">
                Studies show that <strong className="font-bold">42% of startups fail due to a lack of market demand</strong>, but equally important 
                is the fact that many brilliant ideas never reach the market because the founder lacks the technical expertise 
                to build the product or the resources to hire a team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-blue-700 dark:text-blue-400 mb-3 text-xl">🎯 The Vision</h3>
                <p className="text-gray-700 dark:text-dark-500">
                  I have a clear, compelling vision for a product that can make a real difference. The idea is validated, 
                  the market opportunity is clear, and the potential is enormous.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-xl border-2 border-orange-300 dark:border-orange-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-orange-700 dark:text-orange-400 mb-3 text-xl">⚙️ The Gap</h3>
                <p className="text-gray-700 dark:text-dark-500">
                  While I excel at ideation, strategy, and vision, I need partners who can bridge the technical gap—developers, 
                  engineers, and technical co-founders who can turn ideas into reality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Obstacles Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">Common Obstacles on the Path</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚫</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Lack of Clear Vision</h3>
                <p className="text-gray-700">
                  Without a well-defined vision, teams struggle to align objectives. I bring clarity and direction to every 
                  project.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Poor Communication</h3>
                <p className="text-gray-700">
                  Ineffective communication leads to misunderstandings and duplicated efforts. I prioritize transparent, 
                  open dialogue.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Insufficient Market Research</h3>
                <p className="text-gray-700">
                  Thorough market research is fundamental. I've done the research and understand our target audience deeply.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fear of Failure</h3>
                <p className="text-gray-700">
                  Fear can stifle creativity. I embrace risk-taking and see failures as learning opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Limited Resources</h3>
                <p className="text-gray-700">
                  Constraints in time and funding can influence the ideation process. That's why I'm seeking the right 
                  partners and investors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What I Bring Section */}
        <div className="bg-gradient-ocean rounded-2xl shadow-xl shadow-blue-500/30 p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">What I Bring to the Table</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <h3 className="font-display font-bold text-xl mb-3">✨ Vision & Strategy</h3>
                <p className="font-medium">Clear, compelling vision with a strategic roadmap to market</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <h3 className="font-display font-bold text-xl mb-3">🔥 Passion & Drive</h3>
                <p className="font-medium">Unstoppable determination to see this through to success</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <h3 className="font-display font-bold text-xl mb-3">🎯 Market Understanding</h3>
                <p className="font-medium">Deep knowledge of the market, audience, and opportunity</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <h3 className="font-display font-bold text-xl mb-3">🤝 Leadership</h3>
                <p className="font-medium">Natural ability to inspire, motivate, and lead teams</p>
              </div>
            </div>
          </div>
        </div>

        {/* What I'm Looking For Section */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient-primary">What I'm Looking For</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-6 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-900/20 p-4 rounded-r-lg">
              <h3 className="font-display font-bold text-xl mb-2 text-indigo-700 dark:text-indigo-400">Technical Co-Founders</h3>
              <p className="text-gray-700 dark:text-dark-500">
                Developers, engineers, and technical experts who can build the product and complement my vision with 
                technical excellence.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/20 p-4 rounded-r-lg">
              <h3 className="font-display font-bold text-xl mb-2 text-blue-700 dark:text-blue-400">Investors</h3>
              <p className="text-gray-700 dark:text-dark-500">
                Investors who understand that great ideas need the right team and resources to succeed. Those who see 
                potential in visionaries who need technical support.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/20 p-4 rounded-r-lg">
              <h3 className="font-display font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">Mentors & Advisors</h3>
              <p className="text-gray-700 dark:text-dark-500">
                Experienced entrepreneurs and advisors who can guide the journey from idea to market and help navigate 
                the challenges.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-700/50 shadow-lg">
            <p className="text-lg md:text-xl text-gray-800 dark:text-dark-700 font-bold">
              If you believe in the power of great ideas and want to be part of bringing one to market, let's connect. 
              Together, we can bridge the gap between vision and reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatILookFor;
