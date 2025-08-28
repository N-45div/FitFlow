import React, { useState } from 'react';

interface DailyCheckInProps {
  onLogCheckIn: (checkIn: { mood: number; sleepHours: number; activityMinutes: number; notes: string }) => void;
  isLoading: boolean;
}

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({ onLogCheckIn, isLoading }) => {
  const [mood, setMood] = useState(3);
  const [sleepHours, setSleepHours] = useState('');
  const [activityMinutes, setActivityMinutes] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogCheckIn({
      mood,
      sleepHours: parseFloat(sleepHours) || 0,
      activityMinutes: parseFloat(activityMinutes) || 0,
      notes,
    });
    // Reset fields
    setSleepHours('');
    setActivityMinutes('');
    setNotes('');
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-lg border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
        💭 Daily Check-in
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-orange-700 mb-3">How are you feeling today? (1-5)</label>
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-orange-300">
            <span className="text-2xl">😞</span>
            <input
              type="range"
              min="1"
              max="5"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full mx-4 h-3 bg-orange-300 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #FB923C 0%, #FB923C ${((mood-1)/4)*100}%, #FED7AA ${((mood-1)/4)*100}%, #FED7AA 100%)`
              }}
            />
            <span className="text-2xl">😄</span>
          </div>
          <p className="text-center text-orange-600 font-medium mt-2">Current mood: {mood}/5</p>
        </div>
        <div>
          <label htmlFor="sleepHours" className="block text-sm font-bold text-orange-700 mb-2">💤 Hours of Sleep</label>
          <input
            id="sleepHours"
            type="number"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            placeholder="e.g., 8"
            className="w-full mt-1 p-3 bg-white border-2 border-orange-300 rounded-xl text-orange-800 font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="activityMinutes" className="block text-sm font-bold text-orange-700 mb-2">🏃‍♂️ Minutes of Activity</label>
          <input
            id="activityMinutes"
            type="number"
            value={activityMinutes}
            onChange={(e) => setActivityMinutes(e.target.value)}
            placeholder="e.g., 30"
            className="w-full mt-1 p-3 bg-white border-2 border-orange-300 rounded-xl text-orange-800 font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-bold text-orange-700 mb-2">📝 Notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any thoughts or reflections?"
            className="w-full mt-1 p-3 bg-white border-2 border-orange-300 rounded-xl text-orange-800 font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
        >
          {isLoading ? '⏳ Logging...' : '✅ Log Check-in'}
        </button>
      </form>
    </div>
  );
};
