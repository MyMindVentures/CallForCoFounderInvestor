import { Link } from 'react-router-dom';

function Landing() {
  const navCards = [
    {
      to: '/storytelling',
      title: 'My Story',
      description: 'Learn about my journey',
      icon: '📖',
      gradient: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-600 to-pink-600'
    },
    {
      to: '/what-i-look-for',
      title: 'What I Look For',
      description: 'Investors & CoFounders',
      icon: '🤝',
      gradient: 'from-blue-500 to-indigo-500',
      hoverGradient: 'from-blue-600 to-indigo-600'
    },
    {
      to: '/developer-help',
      title: 'Developer Help',
      description: 'IDEs, n8n, Vibe Coding',
      icon: '💻',
      gradient: 'from-green-500 to-emerald-500',
      hoverGradient: 'from-green-600 to-emerald-600'
    },
    {
      to: '/financial-help',
      title: 'Financial Support',
      description: 'Instant donation via Wise',
      icon: '💰',
      gradient: 'from-yellow-500 to-orange-500',
      hoverGradient: 'from-yellow-600 to-orange-600'
    },
    {
      to: '/support',
      title: 'Support & Messages',
      description: 'Share your thoughts',
      icon: '💬',
      gradient: 'from-cyan-500 to-blue-500',
      hoverGradient: 'from-cyan-600 to-blue-600'
    },
    {
      to: '/adhd-aries',
      title: 'ADHD + Aries',
      description: 'Understanding my strengths',
      icon: '✨',
      gradient: 'from-red-500 to-orange-500',
      hoverGradient: 'from-red-600 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-mesh opacity-5 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6 gradient-text-animated">
              Call for Investor/CoFounder
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-dark-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Join me on an extraordinary journey from vision to reality. 
              <span className="block mt-2 text-gradient-primary font-bold">
                Great ideas deserve great execution.
              </span>
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-gradient-purple text-white rounded-full font-semibold shadow-lg shadow-purple-500/50 hover:shadow-glow-purple transition-all duration-300 transform hover:scale-105">
              💡 Vision-Driven
            </div>
            <div className="px-6 py-3 bg-gradient-sunset text-white rounded-full font-semibold shadow-lg shadow-pink-500/50 hover:shadow-glow-pink transition-all duration-300 transform hover:scale-105">
              🚀 Action-Oriented
            </div>
            <div className="px-6 py-3 bg-gradient-blue text-white rounded-full font-semibold shadow-lg shadow-blue-500/50 hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              🤝 Partnership-Focused
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-gray-800 dark:text-dark-700">
            Explore My Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navCards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group relative glass-effect rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-dark-900/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2 text-gray-800 dark:text-dark-700 group-hover:text-white transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark-500 group-hover:text-white/90 transition-colors duration-300">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center text-gradient-primary group-hover:text-white transition-colors duration-300">
                    <span className="font-semibold">Learn more</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-ocean rounded-2xl shadow-xl shadow-purple-500/30 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Make an Impact?</h2>
              <p className="text-xl mb-8 opacity-95 font-medium">
                Whether you're an investor, technical co-founder, or supporter, 
                your partnership can help turn vision into reality.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/what-i-look-for"
                  className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Learn More
                </Link>
                <Link
                  to="/support"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/30"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
