import React, { useState } from 'react';
import { Heart, Zap, User } from 'lucide-react';
import { sendMessage } from '../lib/ao';
import { UserData } from '../types/UserData';

interface RegistrationModalProps {
  isOpen: boolean;
  onComplete: (data: UserData) => void;
}

export default function RegistrationModal({ isOpen, onComplete }: RegistrationModalProps) {
  const [formData, setFormData] = useState<Partial<UserData>>({ age: 0, gender: '', fitness_level: '', goal: '', weight: 0, height: 0 });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every(value => value !== '' && value !== 0)) {
      setIsRegistering(true);
      try {
        const registrationTags = [
          { name: "Age", value: String(formData.age) },
          { name: "Gender", value: formData.gender! },
          { name: "FitnessLevel", value: formData.fitness_level! },
          { name: "Goal", value: formData.goal! },
          { name: "Weight", value: String(formData.weight) },
          { name: "Height", value: String(formData.height) }
        ];
        await sendMessage({ action: "Register", tags: registrationTags });
        alert("Registration successful! Welcome!");
        // Get wallet address from global wallet
        const walletAddress = await (globalThis as any).arweaveWallet.getActiveAddress();
        const completeUserData: UserData = {
          ...formData as Required<Partial<UserData>>,
          wallet_address: walletAddress,
          registration_date: Date.now()
        };
        onComplete(completeUserData);
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please check the console and try again.");
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const handleChange = (field: keyof Partial<UserData>, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 transform transition-all duration-300 scale-100">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="relative">
              <Heart className="h-12 w-12 text-orange-500" fill="currentColor" />
              <Zap className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your AI Wellness Coach!</h1>
          <p className="text-gray-600">Let's personalize your fitness journey</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input type="number" value={formData.age || ''} onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)} min="13" max="100" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" placeholder="Enter your age" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
            <select value={formData.fitness_level} onChange={(e) => handleChange('fitness_level', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" required>
              <option value="">Select fitness level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
            <select value={formData.goal} onChange={(e) => handleChange('goal', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" required>
              <option value="">Select your goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="general-health">General Health</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight (kg)</label>
              <input type="number" value={formData.weight || ''} onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)} step="0.1" min="30" max="300" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" placeholder="Weight" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input type="number" value={formData.height || ''} onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)} min="100" max="250" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" placeholder="Height" required />
            </div>
          </div>
          <button type="submit" disabled={isRegistering} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-400">
            <User className="h-5 w-5" />
            <span>{isRegistering ? 'Registering...' : 'Start My Journey'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}