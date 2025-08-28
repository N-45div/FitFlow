import { FC } from 'react';
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
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl shadow-sm">
            <Apple className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-orange-800">🍎 Nutrition Tracker</h2>
        </div>
        <button
          onClick={onLogMeal}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <BookPlus className="h-4 w-4" />
          <span>📝 Log Meal</span>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {nutritionLogs.length > 0 ? (
          nutritionLogs.map((log, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
              <div>
                <span className="font-semibold text-orange-800">{log.food_item}</span>
                <p className="text-xs text-orange-600 font-medium">{formatDate(log.date)}</p>
              </div>
              <span className="text-sm text-white font-bold bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-2 rounded-full shadow-sm">{log.calories} kcal</span>
            </div>
          ))
        ) : (
          <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-200">
            <p className="text-orange-700 font-medium">🥗 Your meal history will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
}