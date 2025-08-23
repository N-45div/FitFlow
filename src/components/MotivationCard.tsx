import React from 'react';
import { Sparkles, Lightbulb, Target } from 'lucide-react';

export default function MotivationCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Sparkles className="h-6 w-6 text-yellow-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Your Daily Boost</h2>
      </div>

      <div className="space-y-6">
        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 text-center">
          <p className="text-lg font-medium text-gray-800 italic">
            "Your future self will thank you!"
          </p>
        </div>

        {/* Health Tip */}
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <div className="p-1 bg-blue-200 rounded-full mt-1">
            <Lightbulb className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Health Tip of the Day</h3>
            <p className="text-sm text-gray-700">
              Drink a glass of water when you wake up to kickstart your metabolism and hydrate your body after hours of rest.
            </p>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
          <div className="p-1 bg-green-200 rounded-full mt-1">
            <Target className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Daily Challenge</h3>
            <p className="text-sm text-gray-700">
              Take the stairs today instead of the elevator. Every step counts towards your health goals!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}