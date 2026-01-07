import { useState, useEffect } from 'react';
import axios from 'axios';

function ADHDAries() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/adhDAries');
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Default content with researched information
      setContent(`
        <div class="prose prose-lg max-w-none">
          <h1 class="text-3xl md:text-4xl font-bold mb-6 text-red-600">ADHD + Aries: A Powerful Combination</h1>
          <p class="text-lg md:text-xl text-gray-700 mb-8">Understanding the unique strengths that come from combining ADHD traits with Aries zodiac characteristics.</p>
        </div>
      `);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-fire dark:bg-gradient-dark py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
            ADHD + Aries: A Powerful Combination
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-dark-700 max-w-2xl mx-auto font-medium">
            Understanding the unique strengths that come from combining ADHD traits with Aries zodiac characteristics
          </p>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        {/* ADHD Traits Section */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient-secondary flex items-center">
            <span className="mr-3 text-4xl">⚡</span>
            ADHD: The Superpower of Hyperfocus
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-dark-600">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              ADHD is often misunderstood as a limitation, but for entrepreneurs and innovators, it can be a powerful asset. 
              The ADHD brain operates differently—with heightened creativity, rapid idea generation, and the ability to see 
              connections others miss.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 p-6 rounded-xl border-2 border-red-300 dark:border-red-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-red-700 dark:text-red-400 mb-2 text-lg">🎯 Hyperfocus</h3>
                <p className="text-gray-700 dark:text-dark-500">When an ADHD person finds something that truly interests them, they can achieve an intense level of 
                concentration that allows for breakthrough thinking and rapid problem-solving.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border-2 border-orange-300 dark:border-orange-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-orange-700 dark:text-orange-400 mb-2 text-lg">💡 Creative Thinking</h3>
                <p className="text-gray-700 dark:text-dark-500">ADHD minds are naturally creative, constantly generating new ideas and seeing patterns that others don't. 
                This divergent thinking is essential for innovation.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-yellow-700 dark:text-yellow-400 mb-2 text-lg">🚀 High Energy</h3>
                <p className="text-gray-700 dark:text-dark-500">The high energy levels associated with ADHD can fuel long work sessions and maintain momentum through 
                challenging projects.</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 p-6 rounded-xl border-2 border-pink-300 dark:border-pink-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-pink-700 dark:text-pink-400 mb-2 text-lg">🔄 Adaptability</h3>
                <p className="text-gray-700 dark:text-dark-500">ADHD individuals excel at pivoting quickly, adapting to new situations, and thinking on their feet—all 
                crucial skills in the fast-paced startup world.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aries Traits Section */}
        <div className="glass-effect rounded-2xl shadow-xl dark:shadow-dark-900/50 p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient-accent flex items-center">
            <span className="mr-3 text-4xl">🔥</span>
            Aries: The Fire Sign Leadership
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-dark-600">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              As the first sign of the zodiac, Aries represents new beginnings, leadership, and fearless initiative. 
              Aries individuals are natural pioneers, unafraid to take risks and blaze new trails.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border-2 border-orange-300 dark:border-orange-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-orange-700 dark:text-orange-400 mb-2 text-lg">👑 Natural Leadership</h3>
                <p className="text-gray-700 dark:text-dark-500">Aries are born leaders, confident in their decisions and unafraid to take charge. They inspire others 
                with their passion and determination.</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 p-6 rounded-xl border-2 border-red-300 dark:border-red-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-red-700 dark:text-red-400 mb-2 text-lg">⚔️ Fearless Initiative</h3>
                <p className="text-gray-700 dark:text-dark-500">Aries don't wait for permission—they act. This boldness is essential for entrepreneurs who need to move 
                quickly and seize opportunities.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-yellow-700 dark:text-yellow-400 mb-2 text-lg">💪 Unstoppable Drive</h3>
                <p className="text-gray-700 dark:text-dark-500">The Aries drive is relentless. Once they set their sights on a goal, nothing can stop them from achieving 
                it.</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 p-6 rounded-xl border-2 border-pink-300 dark:border-pink-700/50 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-pink-700 dark:text-pink-400 mb-2 text-lg">🌟 Competitive Spirit</h3>
                <p className="text-gray-700 dark:text-dark-500">Aries thrive on competition and challenges. They're motivated by the desire to be first, to win, and to 
                prove themselves.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Power Section */}
        <div className="bg-gradient-fire rounded-2xl shadow-xl shadow-red-500/30 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 flex items-center">
              <span className="mr-3 text-4xl">✨</span>
              The Combined Power
            </h2>
            <div className="space-y-4 text-lg md:text-xl leading-relaxed font-medium">
              <p>
                When ADHD's hyperfocus and creative thinking combine with Aries' leadership and fearless initiative, 
                you get an unstoppable force for innovation. This combination creates:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li><strong className="font-bold">Rapid Innovation:</strong> The ability to generate ideas quickly and execute them fearlessly</li>
                <li><strong className="font-bold">Natural Entrepreneurship:</strong> A perfect blend of vision, energy, and action</li>
                <li><strong className="font-bold">Resilience:</strong> The determination to push through challenges and setbacks</li>
                <li><strong className="font-bold">Inspiring Leadership:</strong> The charisma to rally others around a vision</li>
                <li><strong className="font-bold">Breakthrough Thinking:</strong> Seeing solutions where others see problems</li>
              </ul>
              <p className="mt-6 font-bold text-xl md:text-2xl">
                This unique combination is why I'm seeking partners who understand that different thinking isn't a weakness—it's 
                a superpower that can change the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADHDAries;
