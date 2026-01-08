import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Code, DollarSign, MessageSquare, Sparkles, ArrowRight, Lightbulb, Rocket, Handshake, GitFork, Heart, Github, Zap, Shield, Brain, Puzzle, Package, Database, TrendingUp, Flame } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, MotionCard } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function Landing() {
  // GitHub repository URL from environment variable
  const githubRepoUrl = import.meta.env.VITE_GITHUB_REPO_URL || '#';

  const navCards = [
    {
      to: '/storytelling',
      title: 'My Story',
      description: 'Learn about my journey',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      to: '/what-i-look-for',
      title: 'What I Look For',
      description: 'Investors & CoFounders',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      to: '/developer-help',
      title: 'Developer Help',
      description: 'IDEs, n8n, Vibe Coding',
      icon: Code,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      to: '/financial-help',
      title: 'Financial Support',
      description: 'Instant donation via Wise',
      icon: DollarSign,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      to: '/support',
      title: 'Support & Messages',
      description: 'Share your thoughts',
      icon: MessageSquare,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      to: '/adhd-aries',
      title: 'ADHD + Aries',
      description: 'Understanding my strengths',
      icon: Sparkles,
      gradient: 'from-red-500 to-orange-500',
    }
  ];

  return (
    <PageTransition className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 sm:mb-6 gradient-text-animated px-2">
              Call for Investor/CoFounder
            </h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join me on an extraordinary journey from vision to reality. 
              <span className="block mt-2 sm:mt-3 text-gradient-primary font-bold">
                Great ideas deserve great execution.
              </span>
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Badge variant="teal" size="lg" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Vision-Driven
            </Badge>
            <Badge variant="mixed" size="lg" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Action-Oriented
            </Badge>
            <Badge variant="purple" size="lg" className="flex items-center gap-2">
              <Handshake className="w-4 h-4" />
              Partnership-Focused
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* The Call - Content Cards Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-200 px-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Call
          </motion.h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            
            {/* Card 1.1 - Hero Card (spans 2 cols on lg) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="gradient" size="lg" className="h-full bg-gradient-to-br from-teal-500/80 via-cyan-500/80 to-blue-500/80 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">
                      Two partners. One turnaround.
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg opacity-95 leading-relaxed mb-6">
                    I need two people to help me break the loop: one <span className="font-bold">financial support partner</span> and 
                    one <span className="font-bold">solo developer/mentor</span>. Together we ship the first two apps that prove what I can do.
                  </p>
                  <Link to="/what-i-look-for">
                    <Button variant="glassFrost" size="lg">
                      Choose your role
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Card 1.2 - Not a shortcut */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card variant="glass" size="lg" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-7 h-7 text-red-400" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                    This is NOT a shortcut
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  I'm not one of the millions who thinks apps are easy or AI builds everything. 
                  I've fought for months across tools, tutorials, and broken builds. 
                  <span className="text-teal-400 font-semibold"> This is serious execution.</span>
                </p>
              </Card>
            </motion.div>

            {/* Card 1.3 - Ideas are my talent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="glass" size="lg" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-7 h-7 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                    Ideas are my talent
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  My strength is app ideation and feature thinking—fast, deep, and constant. 
                  What I need is <span className="text-purple-400 font-semibold">the bridge from architect to shipped product.</span>
                </p>
              </Card>
            </motion.div>

            {/* Card - The Fight Behind This (Personal Story Teaser) */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card variant="glass" size="lg" className="h-full border-l-4 border-l-orange-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="w-7 h-7 text-orange-400" />
                    <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                      The Fight Behind This
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                    For months I've been trapped in a tooling loop — fighting through tutorials, broken builds, and endless learning curves. 
                    I'm an <span className="text-orange-400 font-semibold">inventor at heart</span>, not lacking in capability or vision, 
                    but lacking the bridge to turn ideas into shipped products. This project exists because I refuse to let another year pass 
                    without proof that my mind can create something real.
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    I don't underestimate developers' hard work. But I've spent countless hours searching, learning, and becoming deeply frustrated 
                    that my thoughts couldn't come alive. This is my last push — to showcase potential, find believers, and finally flip the narrative.
                  </p>
                  <Link to="/storytelling">
                    <span className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-semibold text-sm">
                      Read my full story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Card 1.4 - The Quartet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card variant="glass" size="lg" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Puzzle className="w-7 h-7 text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                    The symbolic quartet
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  The magic happens when four forces align: <span className="text-teal-400">me (architect)</span>, 
                  <span className="text-purple-400"> you (builder/backer)</span>, 
                  <span className="text-yellow-400"> an investor (breathing room)</span>, and 
                  <span className="text-cyan-400"> AI (leverage)</span>. Structure turns it into results.
                </p>
              </Card>
            </motion.div>

            {/* Card 1.5 - Two apps = proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card variant="glass" size="lg" className="h-full border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-7 h-7 text-emerald-400" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                    Two apps change everything
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  I don't need ten apps. I need two shipped apps to show proof:
                </p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-center gap-2 text-emerald-300">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    Lifemanagement Stack (my life back on rails)
                  </li>
                  <li className="flex items-center gap-2 text-emerald-300">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    IdeaFabric (portable idea blueprint machine)
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Card 1.6 - Chaos to Vault */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card variant="glass" size="lg" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-7 h-7 text-blue-400" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100">
                    Chaos → data vault
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Chats, Raindrops tutorials, <span className="text-blue-400 font-semibold">90+ broken repos</span>, and scattered notes 
                  become a goldmine once centralized: documentation, workflows, insights, and a reusable idea vault.
                </p>
              </Card>
            </motion.div>

            {/* Card 1.7 - The Snowball Flips (Hero Card) */}
            <motion.div
              className="md:col-span-2 lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card variant="gradient" size="lg" className="bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-orange-500/80 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-4">
                    <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-4">
                    The snowball flips
                  </h3>
                  <p className="text-base sm:text-lg opacity-95 leading-relaxed max-w-2xl mx-auto mb-6">
                    Until now the snowball was negative: <span className="line-through opacity-70">stress → fear → delays → debt</span>. 
                    <br className="hidden sm:block" />
                    With breathing room + mentorship, it flips: <span className="font-bold">structure → shipping → proof → compounding.</span>
                  </p>
                  <Link to="/support">
                    <Button variant="glassFrost" size="lg">
                      Apply now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-200 px-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Explore My Journey
          </motion.h2>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {navCards.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.to}>
                  <Link to={card.to}>
                    <MotionCard
                      className="group relative"
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        variant="interactive" 
                        size="lg"
                        className="min-h-[200px] sm:min-h-[240px] flex flex-col overflow-hidden"
                      >
                        {/* Gradient Overlay on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                        
                        <div className="relative flex-1 flex flex-col">
                          <motion.div 
                            className="mb-3 sm:mb-4"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400 group-hover:text-white transition-colors duration-300" />
                          </motion.div>
                          
                          <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-gray-200 group-hover:text-white transition-colors duration-300">
                            {card.title}
                          </h3>
                          
                          <p className="text-sm sm:text-base text-gray-400 group-hover:text-white/90 transition-colors duration-300 flex-1">
                            {card.description}
                          </p>
                          
                          <div className="mt-4 sm:mt-5 flex items-center text-teal-400 group-hover:text-white transition-colors duration-300">
                            <span className="font-semibold text-sm sm:text-base">Learn more</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </Card>
                    </MotionCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Open Source Community Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" size="xl" className="text-center relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon cluster */}
                <motion.div 
                  className="flex justify-center items-center gap-3 mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <GitFork className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" />
                  <Github className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                  Open Source, Open Hearts
                </h2>
                
                <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed px-2">
                  This project is a work in progress, built with passion but still growing. 
                  After months of fighting through stress and anxiety, I'm reaching out to 
                  <span className="text-teal-400 font-semibold"> developers</span>, 
                  <span className="text-purple-400 font-semibold"> GitHub fans</span>, and 
                  <span className="text-pink-400 font-semibold"> empathic souls</span> who 
                  might want to help make this vision a reality.
                </p>

                {/* Feature badges */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-3 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Badge variant="purple" size="lg" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Work in Progress
                  </Badge>
                  <Badge variant="teal" size="lg" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Contributors Welcome
                  </Badge>
                  <Badge variant="mixed" size="lg" className="flex items-center gap-2">
                    <GitFork className="w-4 h-4" />
                    Fork & Improve
                  </Badge>
                </motion.div>

                <p className="text-sm sm:text-base text-gray-400 mb-8 px-2">
                  Whether you want to fork the repo and contribute code, or simply connect 
                  and offer guidance from a distance — your support means everything.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <a 
                    href={githubRepoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="purple" 
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Fork on GitHub
                    </Button>
                  </a>
                  <Link to="/support">
                    <Button 
                      variant="glass" 
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card 
              variant="gradient"
              size="xl"
              className="bg-gradient-to-br from-teal-500/90 via-cyan-500/90 to-purple-500/90 text-white relative overflow-hidden"
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
                  Ready to Make an Impact?
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 font-medium px-2">
                  Whether you're an investor, technical co-founder, or supporter, 
                  your partnership can help turn vision into reality.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <Link to="/what-i-look-for">
                    <Button 
                      variant="glassFrost" 
                      size="lg"
                      className="bg-white text-teal-600 hover:bg-gray-100 border-0"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/support">
                    <Button 
                      variant="glassFrost" 
                      size="lg"
                    >
                      Get in Touch
                      <MessageSquare className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Landing;
