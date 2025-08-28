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

interface WorkoutCardProps {
  workouts: WorkoutData[];
  suggestedWorkout: SuggestedExercise[] | null;
  onRequestNewWorkout: () => void;
}

export default function WorkoutCard({ workouts, suggestedWorkout, onRequestNewWorkout }: WorkoutCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300">
      {/* AI Suggestion Section */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl shadow-sm">
          <Dumbbell className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-orange-800">🤖 AI Workout Suggestion</h2>
      </div>
      <div className="space-y-3 mb-6 p-5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-300 shadow-inner">
        {suggestedWorkout ? (
          suggestedWorkout.map((exercise, index) => (
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