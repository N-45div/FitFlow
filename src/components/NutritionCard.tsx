import React from 'react';
import { Apple, BookPlus } from 'lucide-react';

interface NutritionData {
  food_item: string;
  calories: number;
  date: number;
}

interface NutritionCardProps {
  nutritionLogs: NutritionData[];
  onLogMeal: () => void;
}

export default function NutritionCard({ nutritionLogs, onLogMeal }: NutritionCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Apple className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Meals</h2>
        </div>
        <button
          onClick={onLogMeal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <BookPlus className="h-4 w-4" />
          <span>Log Meal</span>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {nutritionLogs.length > 0 ? (
          nutritionLogs.map((log, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div>
                <span className="font-medium text-gray-800">{log.food_item}</span>
                <p className="text-xs text-gray-500">{formatDate(log.date)}</p>
              </div>
              <span className="text-sm text-gray-600 font-medium">{log.calories} kcal</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No meals logged yet. Log a meal to see your history here!</p>
        )}
      </div>
    </div>
  );
}