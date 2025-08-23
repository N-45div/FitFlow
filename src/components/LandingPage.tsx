import React from 'react';
import { Hero } from '../components/ui/animated-hero';
import { Heart, Zap, Target, Users, TrendingUp, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Personalized Plans",
      description: "AI-generated workout and nutrition plans tailored to your unique goals and preferences."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
      title: "Progress Tracking",
      description: "Visual progress charts and streak tracking to keep you motivated on your journey."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community Support",
      description: "Connect with like-minded individuals and share your wellness achievements."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure & Private",
      description: "Your health data is encrypted and stored securely with blockchain technology."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "The AI coach helped me lose 15 pounds in 3 months with personalized plans that actually fit my busy schedule.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "Finally, a wellness app that understands my lifestyle. The nutrition plans are realistic and the workouts are efficient.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Working Mom",
      content: "The daily motivation and quick workouts have been game-changers. I feel stronger and more energetic than ever!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
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
              <a href="#testimonials" className="text-gray-600 hover:text-orange-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">Pricing</a>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of people who have transformed their lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Heart className="h-8 w-8 text-orange-500" fill="currentColor" />
                  <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold">AI Wellness Coach</h3>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering your wellness journey with personalized AI coaching, 
                secure blockchain technology, and a supportive community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Wellness Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}