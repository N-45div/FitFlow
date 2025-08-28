import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DailyCheckInData {
  mood: number;
  sleep_hours: number;
  activity_minutes: number;
  notes: string;
  date: number;
}

interface DashboardProps {
  dailyCheckIns: Record<string, DailyCheckInData>;
}

export const Dashboard: React.FC<DashboardProps> = ({ dailyCheckIns }) => {
  const chartData = Object.values(dailyCheckIns)
    .sort((a, b) => a.date - b.date)
    .map(checkIn => ({
      date: new Date(checkIn.date).toLocaleDateString(),
      mood: checkIn.mood,
      sleep: checkIn.sleep_hours,
      activity: checkIn.activity_minutes,
    }));

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-lg border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
        📊 Wellness Trends
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FED7AA" />
          <XAxis dataKey="date" stroke="#EA580C" fontSize={12} />
          <YAxis stroke="#EA580C" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFF7ED', 
              border: '2px solid #FB923C',
              borderRadius: '8px',
              color: '#EA580C'
            }} 
          />
          <Legend wrapperStyle={{ color: '#EA580C' }} />
          <Line type="monotone" dataKey="mood" stroke="#F59E0B" strokeWidth={3} name="Mood (1-5)" dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
          <Line type="monotone" dataKey="sleep" stroke="#FB923C" strokeWidth={3} name="Sleep (hours)" dot={{ fill: '#FB923C', strokeWidth: 2, r: 4 }} />
          <Line type="monotone" dataKey="activity" stroke="#EA580C" strokeWidth={3} name="Activity (mins)" dot={{ fill: '#EA580C', strokeWidth: 2, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
