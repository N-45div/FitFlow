import { FC } from 'react';
import { DailyCheckIn } from './DailyCheckIn';
import { CheckInHistory } from './CheckInHistory';

interface DailyCheckInData {
  mood: number;
  sleep_hours: number;
  activity_minutes: number;
  notes: string;
  date: number;
}

interface WellnessDashboardProps {
  onLogCheckIn: (checkIn: { mood: number; sleepHours: number; activityMinutes: number; notes: string }) => void;
  isLoading: boolean;
  dailyCheckIns: Record<string, DailyCheckInData>;
}

export const WellnessDashboard: FC<WellnessDashboardProps> = ({ onLogCheckIn, isLoading, dailyCheckIns }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-800 mb-2">🌟 Wellness Dashboard</h2>
          <p className="text-orange-600">Track your daily wellness journey with AI insights</p>
        </div>
        <DailyCheckIn onLogCheckIn={onLogCheckIn} isLoading={isLoading} />
        <CheckInHistory checkIns={dailyCheckIns} />
      </div>
    </div>
  );
};
