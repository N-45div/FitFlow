import React from 'react';
import { Hero } from '../components/ui/animated-hero';
import { Heart, Zap, Target, Users, TrendingUp, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "72+ Hour Autonomous Operation",
      description: "Self-triggering AI agent that runs continuously on Arweave's AO protocol without interruption."
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-600" />,
      title: "Permanent Data Storage",
      description: "All your wellness data is stored permanently on Arweave blockchain - never lost, always accessible."
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Real-time AI Insights",
      description: "Personalized health recommendations and trend analysis powered by autonomous AI agents."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Message-based Architecture",
      description: "Scalable AO process communication enabling infinite growth and cross-agent collaboration."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Wallet Integration",
      description: "Seamless Arweave wallet connection with secure, decentralized authentication."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Modern React Frontend",
      description: "Beautiful, responsive UI built with React, TypeScript, and TailwindCSS for optimal user experience."
    }
  ];


  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-8 w-8 text-orange-500" fill="currentColor" />
                <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AI Wellness Coach
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
              <a href="#tech-stack" className="text-gray-600 hover:text-orange-600 transition-colors">Tech Stack</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onGetStarted={onGetStarted} onLearnMore={handleLearnMore} />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Wellness Coach?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of personalized wellness with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-600">
              Powered by Arweave's AO protocol for autonomous, permanent operation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold text-gray-900">AO Protocol</h3>
              <p className="text-sm text-gray-600">Autonomous Objects</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="font-semibold text-gray-900">Arweave</h3>
              <p className="text-sm text-gray-600">Permanent Storage</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="font-semibold text-gray-900">React</h3>
              <p className="text-sm text-gray-600">Frontend Framework</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🔷</div>
              <h3 className="font-semibold text-gray-900">TypeScript</h3>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of users who have already started their wellness journey with AI coaching
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative">
                <Heart className="h-8 w-8 text-orange-500" fill="currentColor" />
                <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold">AI Wellness Coach</h3>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="https://x.com/godlovesu_n" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Creator on X
              </a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Wellness Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}