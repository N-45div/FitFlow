import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

interface ProgressCardProps {
  onLogProgress: () => void;
}

export default function ProgressCard({ onLogProgress }: ProgressCardProps) {
  // Simple chart data for the last 7 days
  const chartData = [72, 71.8, 71.5, 71.7, 71.3, 71.1, 70.9];
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
      </div>

      <div className="space-y-6">
        {/* Weight Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Weight Trend (Last 7 Days)</h3>
          <div className="flex items-end space-x-2 h-20">
            {chartData.map((value, index) => {
              const height = ((value - minValue) / range) * 60 + 10;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all duration-300 hover:from-green-600 hover:to-green-400"
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{value}kg</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workout Streak */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-gray-900">Workout Streak</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">5</span>
            <span className="text-gray-600">days</span>
            <span className="text-xl">🔥</span>
          </div>
        </div>
      </div>

      <button
        onClick={onLogProgress}
        className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <TrendingUp className="h-4 w-4" />
        <span>Log Progress</span>
      </button>
    </div>
  );
}