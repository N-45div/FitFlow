import React from 'react';

interface DailyCheckInData {
  mood: number;
  sleep_hours: number;
  activity_minutes: number;
  notes: string;
  date: number;
}

interface CheckInHistoryProps {
  checkIns: Record<string, DailyCheckInData>;
}

export const CheckInHistory: React.FC<CheckInHistoryProps> = ({ checkIns }) => {
  const sortedCheckIns = Object.values(checkIns).sort((a, b) => b.date - a.date);

  if (sortedCheckIns.length === 0) {
    return null; // Don't render anything if there are no check-ins
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-lg border border-orange-200 mt-8">
      <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
        📊 Check-in History
      </h3>
      <ul className="space-y-4">
        {sortedCheckIns.map((checkIn) => (
          <li key={checkIn.date} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
            <p className="text-sm text-orange-600 font-medium mb-2">{new Date(checkIn.date).toLocaleDateString()}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-orange-800 font-semibold">😊 Mood</p>
                <p className="text-orange-600 font-bold">{checkIn.mood}/5</p>
              </div>
              <div className="text-center">
                <p className="text-orange-800 font-semibold">💤 Sleep</p>
                <p className="text-orange-600 font-bold">{checkIn.sleep_hours}h</p>
              </div>
              <div className="text-center">
                <p className="text-orange-800 font-semibold">🏃‍♂️ Activity</p>
                <p className="text-orange-600 font-bold">{checkIn.activity_minutes}m</p>
              </div>
            </div>
            {checkIn.notes && (
              <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-orange-300">
                <p className="text-orange-700 font-medium">📝 Notes: {checkIn.notes}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
