import React, { useState } from 'react';
import { X, Save, Dumbbell } from 'lucide-react';
import { sendMessage } from '../lib/ao';

interface LogWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogWorkoutModal({ isOpen, onClose }: LogWorkoutModalProps) {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (workoutType && duration) {
      setIsSaving(true);
      try {
        await sendMessage({
          action: 'LogWorkout',
          tags: [
            { name: 'Type', value: workoutType },
            { name: 'Duration', value: duration },
          ],
        });
        alert('Workout logged successfully!');
        setWorkoutType('');
        setDuration('');
        onClose();
      } catch (error) {
        console.error('Failed to log workout:', error);
        alert('Failed to log workout. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center"><Dumbbell className="mr-3 text-orange-500"/>Log Workout</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Workout Type</label>
            <input type="text" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" placeholder="e.g., Running, Weightlifting, Yoga" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} step="1" min="1" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200" placeholder="Enter duration in minutes" />
          </div>
        </div>
        <div className="flex space-x-3 mt-8">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">Cancel</button>
          <button onClick={handleSave} disabled={!workoutType || !duration || isSaving} className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Saving...' : 'Save Workout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
