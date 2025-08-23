import React from 'react';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      {/* AI Suggestion Section */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Dumbbell className="h-6 w-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Today's Suggested Workout</h2>
      </div>
      <div className="space-y-3 mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
        {suggestedWorkout ? (
          suggestedWorkout.map((exercise, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{exercise.name}</span>
              <span className="text-sm text-gray-600 font-medium">{exercise.details}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Click the button to get a new workout suggestion from your AI coach!</p>
        )}
      </div>
      <button
        onClick={onRequestNewWorkout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-6"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Request New Workout</span>
      </button>

      {/* Divider */}
      <hr className="my-6"/>

      {/* Recent Workouts Section */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Recent Workouts</h3>
      <div className="space-y-3">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">{workout.type}</span>
                <p className="text-xs text-gray-500">{formatDate(workout.date)}</p>
              </div>
              <span className="text-sm text-gray-600 font-medium">{workout.duration_minutes} mins</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-3">Your logged workouts will appear here.</p>
        )}
      </div>
    </div>
  );
}