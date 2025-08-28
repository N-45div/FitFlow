import { useState, useEffect, useCallback } from 'react';
import { useConnection } from 'arweave-wallet-kit';
import { sendMessage, getMessageResult } from './lib/ao';
import { UserData } from './types/UserData';

import LandingPage from './components/LandingPage';
import Header from './components/Header';
import WorkoutCard from './components/WorkoutCard';
import NutritionCard from './components/NutritionCard';
import { Dashboard } from './components/dashboard/Dashboard';
import { WellnessDashboard } from './components/wellness/WellnessDashboard';
import LogWorkoutModal from './components/LogWorkoutModal';
import LogNutritionModal from './components/LogNutritionModal';
import RegistrationModal from './components/RegistrationModal';
import ProfilePage from './components/ProfilePage';
import Notifications from './components/Notifications';
import AutonomousStatus from './components/AutonomousStatus';

// Data structures
interface WorkoutData {
  type: string; duration_minutes: number; date: number;
}
interface NutritionData {
  food_item: string; calories: number; date: number;
}
interface SuggestedExercise {
  name: string; details: string;
}
interface Notification {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
  type?: 'insight' | 'health_alert' | 'workout_reminder' | 'general';
}

interface DailyCheckInData {
  mood: number; sleep_hours: number; activity_minutes: number; notes: string; date: number;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionData[]>([]);
  const [suggestedWorkout, setSuggestedWorkout] = useState<SuggestedExercise[] | null>(null);
  const [dailyCheckIns, setDailyCheckIns] = useState<Record<string, DailyCheckInData>>({});
  const [isLogging, setIsLogging] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [showLogWorkout, setShowLogWorkout] = useState(false);
  const [showLogNutrition, setShowLogNutrition] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { connected, connect, disconnect } = useConnection();
  
  // Get address from wallet
  const [address, setAddress] = useState<string | null>(null);
  
  useEffect(() => {
    const getAddress = async () => {
      if (connected && (globalThis as any).arweaveWallet) {
        try {
          const addr = await (globalThis as any).arweaveWallet.getActiveAddress();
          setAddress(addr);
        } catch (error) {
          console.error('Failed to get wallet address:', error);
        }
      } else {
        setAddress(null);
      }
    };
    getAddress();
  }, [connected]);

  const loadAppData = useCallback(async () => {
    console.log("Attempting to load app data (workouts, nutrition, suggestions)...");
    try {
      // Send messages and get results directly (legacynet pattern)
      const workoutMsgId = await sendMessage({ action: 'GetWorkouts' });
      const nutritionMsgId = await sendMessage({ action: 'GetNutritionLogs' });
      const suggestionMsgId = await sendMessage({ action: 'RequestWorkout' });
      const checkInMsgId = await sendMessage({ action: 'GetDailyCheckIns' });
      const notificationMsgId = await sendMessage({ action: 'GetNotifications' });

      // Get results for each message
      setTimeout(async () => {
        try {
          const workoutResult = await getMessageResult(workoutMsgId);
          if (workoutResult?.Messages?.[0]?.Data) {
            setWorkouts(JSON.parse(workoutResult.Messages[0].Data));
          }
        } catch (e) { console.log("Workout data not ready yet"); }
      }, 2000);

      setTimeout(async () => {
        try {
          const nutritionResult = await getMessageResult(nutritionMsgId);
          if (nutritionResult?.Messages?.[0]?.Data) {
            setNutritionLogs(JSON.parse(nutritionResult.Messages[0].Data));
          }
        } catch (e) { console.log("Nutrition data not ready yet"); }
      }, 2500);

      setTimeout(async () => {
        try {
          const suggestionResult = await getMessageResult(suggestionMsgId);
          if (suggestionResult?.Messages?.[0]?.Data) {
            setSuggestedWorkout(JSON.parse(suggestionResult.Messages[0].Data));
          }
        } catch (e) { console.log("Suggestion data not ready yet"); }
      }, 3000);

      setTimeout(async () => {
        try {
          const checkInResult = await getMessageResult(checkInMsgId);
          if (checkInResult?.Messages?.[0]?.Data) {
            setDailyCheckIns(JSON.parse(checkInResult.Messages[0].Data));
          }
        } catch (e) { console.log("Check-in data not ready yet"); }
      }, 3500);

      setTimeout(async () => {
        try {
          const notificationResult = await getMessageResult(notificationMsgId);
          if (notificationResult?.Messages?.[0]?.Data) {
            setNotifications(JSON.parse(notificationResult.Messages[0].Data));
          }
        } catch (e) { console.log("Notification data not ready yet"); }
      }, 4000);

      console.log("App data loading initiated.");
    } catch (error) {
      console.error('Failed to load app data:', error);
    }
  }, []);

  const loadUserProfile = useCallback(async () => {
    if (!address) return;
    
    console.log("Attempting to load user profile...");
    setIsRegistered(null); // Set loading state

    try {
      // Check wallet connection before sending message
      if (!connected || !address) {
        console.error('Wallet not connected or no address');
        setIsRegistered(false);
        return;
      }

      // Ask the agent to get profile (agent will auto-create if needed)
      console.log("Sending GetProfile message...");
      const messageId = await sendMessage({ action: 'GetProfile' });
      console.log("GetProfile message sent, ID:", messageId);

      // Poll for the result using legacynet pattern
      let profile = null;
      for (let i = 0; i < 6; i++) { // Increased attempts
        await new Promise(resolve => setTimeout(resolve, 2000)); // Longer delay for legacynet
        try {
          console.log(`Polling attempt ${i + 1} for message ${messageId}`);
          const result = await getMessageResult(messageId);
          console.log("Poll result:", result);
          
          if (result?.Messages?.[0]?.Data) {
            const data = JSON.parse(result.Messages[0].Data);
            console.log("Profile loaded:", data);
            profile = data;
            break;
          } else {
            console.log("No data in result yet, continuing to poll...");
          }
        } catch (error) {
          console.log(`Profile polling attempt ${i + 1} failed:`, error);
        }
      }

      if (profile) {
        setUserData(profile as UserData);
        setIsRegistered(true);
        loadAppData();
      } else {
        console.log("Profile creation/loading failed. Falling back to registration.");
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setIsRegistered(false);
    }
  }, [address, connected]);

  useEffect(() => {
    if (connected && address) {
      loadUserProfile();
    }
  }, [connected, address, loadUserProfile]);

  const handleRequestNewWorkout = async () => {
    console.log("Requesting new workout from AI agent...");
    if (!address) return;

    try {
      const messageId = await sendMessage({ action: 'RequestWorkout' });

      // Poll for result using legacynet pattern
      let newSuggestion: SuggestedExercise[] | null = null;
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
          const result = await getMessageResult(messageId);
          if (result?.Messages?.[0]?.Data) {
            newSuggestion = JSON.parse(result.Messages[0].Data);
            break;
          }
        } catch (e) { /* ignore error, retry */ }
      }
      if (newSuggestion) {
        setSuggestedWorkout(newSuggestion);
        alert("New workout suggestion loaded!");
      } else {
        alert("Failed to get a new workout suggestion.");
      }
    } catch (error) {
      console.error("Error requesting new workout:", error);
      alert("Failed to request new workout. Please try again.");
    }
  };

  const handleLogCheckIn = async (checkIn: { mood: number; sleepHours: number; activityMinutes: number; notes: string }) => {
    setIsLogging(true);
    try {
      await sendMessage({
        action: 'LogDailyCheckIn',
        tags: [
          { name: 'Mood', value: checkIn.mood.toString() },
          { name: 'SleepHours', value: checkIn.sleepHours.toString() },
          { name: 'ActivityMinutes', value: checkIn.activityMinutes.toString() },
          { name: 'Notes', value: checkIn.notes },
        ],
      });
      // Optimistically update UI or wait for confirmation
      alert("Daily check-in logged successfully!");
      // Optionally, reload data
      if (address) {
        loadAppData();
      }
    } catch (error) {
      console.error("Error logging daily check-in:", error);
      alert("Failed to log check-in. Please try again.");
    } finally {
      setIsLogging(false);
    }
  };

  const handleMarkNotificationsRead = () => {
    sendMessage({ action: 'MarkNotificationsRead' });
    // Optimistically update UI
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSignOut = () => {
    disconnect();
    setUserData(null);
    setIsRegistered(false);
    setShowProfile(false);
  };

  if (!connected) return <LandingPage onGetStarted={connect} />;
  if (isRegistered === null) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onProfileClick={() => setShowProfile(true)} />
      <Notifications notifications={notifications} onMarkAsRead={handleMarkNotificationsRead} />
      <RegistrationModal isOpen={!isRegistered} onComplete={(data) => { setUserData(data); setIsRegistered(true); loadUserProfile(); }} />
      {isRegistered && userData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <AutonomousStatus />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <WorkoutCard workouts={workouts} suggestedWorkout={suggestedWorkout} onRequestNewWorkout={handleRequestNewWorkout} />
              <NutritionCard nutritionLogs={nutritionLogs} onLogMeal={() => setShowLogNutrition(true)} />
            </div>
            <div className="space-y-8">
              <Dashboard dailyCheckIns={dailyCheckIns} />
              <WellnessDashboard onLogCheckIn={handleLogCheckIn} isLoading={isLogging} dailyCheckIns={dailyCheckIns} />
            </div>
          </div>
        </main>
      )}
      <LogWorkoutModal isOpen={showLogWorkout} onClose={() => setShowLogWorkout(false)} />
      <LogNutritionModal isOpen={showLogNutrition} onClose={() => setShowLogNutrition(false)} />
      {showProfile && <ProfilePage userData={userData} onSignOut={handleSignOut} onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default App;
