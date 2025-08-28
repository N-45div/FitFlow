import { FC } from 'react';
import { Dumbbell, RefreshCw } from 'lucide-react';

interface WorkoutData {
  type: string;
  duration_minutes: number;
  date: number;
}

interface SuggestedExercise {
  name: string;
  details: string;
}

interface AIInsights {
  reason: string;
  mood_factor: string;
  sleep_factor: string;
  progression: string;
}

interface EnhancedWorkout {
  exercises: SuggestedExercise[];
  ai_insights: AIInsights;
  personalization_score: number;
  recommended_time: string;
  difficulty_level: string;
}

interface WorkoutCardProps {
  workouts: WorkoutData[];
  suggestedWorkout: SuggestedExercise[] | EnhancedWorkout | null;
  onRequestNewWorkout: () => void;
}

export default function WorkoutCard({ workouts, suggestedWorkout, onRequestNewWorkout }: WorkoutCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper function to check if workout is enhanced AI format
  const isEnhancedWorkout = (workout: any): workout is EnhancedWorkout => {
    return workout && typeof workout === 'object' && 'exercises' in workout && 'ai_insights' in workout;
  };

  // Get exercises array from either format
  const getExercises = (): SuggestedExercise[] => {
    if (!suggestedWorkout) return [];
    if (Array.isArray(suggestedWorkout)) return suggestedWorkout;
    if (isEnhancedWorkout(suggestedWorkout)) return suggestedWorkout.exercises;
    return [];
  };

  const exercises = getExercises();
  const enhancedData = isEnhancedWorkout(suggestedWorkout) ? suggestedWorkout : null;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300">
      {/* AI Suggestion Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl shadow-sm">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-orange-800">🤖 AI Workout Suggestion</h2>
        </div>
        {enhancedData && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-orange-600">Personalization Score:</span>
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
              {enhancedData.personalization_score}/10
            </div>
          </div>
        )}
      </div>

      {/* AI Insights Section */}
      {enhancedData && (
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h3 className="text-sm font-bold text-blue-800 mb-2">🧠 AI Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-blue-700">Difficulty:</span>
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">{enhancedData.difficulty_level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-blue-700">Best Time:</span>
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">{enhancedData.recommended_time}</span>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="font-medium text-blue-700">Focus:</span>
              <span className="ml-2 text-blue-600">{enhancedData.ai_insights.mood_factor}, {enhancedData.ai_insights.sleep_factor}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-6 p-5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-300 shadow-inner">
        {exercises.length > 0 ? (
          exercises.map((exercise: SuggestedExercise, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/70 rounded-lg backdrop-blur-sm">
              <span className="font-semibold text-orange-800">{exercise.name}</span>
              <span className="text-sm text-orange-600 font-medium bg-orange-200 px-3 py-1 rounded-full">{exercise.details}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-orange-700 font-medium">🎯 Click below to get your personalized workout from AI!</p>
        )}
      </div>
      <button
        onClick={onRequestNewWorkout}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mb-6 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <RefreshCw className="h-5 w-5" />
        <span>🔄 Get New AI Workout</span>
      </button>

      {/* Divider */}
      <div className="border-t border-orange-300 my-6"></div>

      {/* Recent Workouts Section */}
      <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
        📈 Your Recent Workouts
      </h3>
      <div className="space-y-3">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
              <div>
                <span className="font-semibold text-orange-800">{workout.type}</span>
                <p className="text-xs text-orange-600 font-medium">{formatDate(workout.date)}</p>
              </div>
              <span className="text-sm text-white font-bold bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-2 rounded-full shadow-sm">{workout.duration_minutes} mins</span>
            </div>
          ))
        ) : (
          <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-200">
            <p className="text-orange-700 font-medium">💪 Your workout history will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
}