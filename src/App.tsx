import React, { useState, useEffect, useCallback } from 'react';
import { useConnection } from 'arweave-wallet-kit';
import { sendMessage, readState } from './lib/ao';

import LandingPage from './components/LandingPage';
import Header from './components/Header';
import WorkoutCard from './components/WorkoutCard';
import NutritionCard from './components/NutritionCard';
import MotivationCard from './components/MotivationCard';
import ProgressCard from './components/ProgressCard';
import LogWorkoutModal from './components/LogWorkoutModal';
import LogNutritionModal from './components/LogNutritionModal';
import RegistrationModal from './components/RegistrationModal';

// Data structures
interface UserData {
  wallet_address: string; registration_date: number; age: number; gender: string; fitness_level: string; goal: string; weight: number; height: number;
}
interface WorkoutData {
  type: string; duration_minutes: number; date: number;
}
interface NutritionData {
  food_item: string; calories: number; date: number;
}
interface SuggestedExercise {
  name: string; details: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionData[]>([]);
  const [suggestedWorkout, setSuggestedWorkout] = useState<SuggestedExercise[] | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [showLogWorkout, setShowLogWorkout] = useState(false);
  const [showLogNutrition, setShowLogNutrition] = useState(false);
  const { connected, address, connect } = useConnection();

  const loadAppData = useCallback(async (userAddress: string) => {
    console.log("Attempting to load app data (workouts, nutrition, suggestions)...");
    try {
      // Trigger agent to cache data
      sendMessage({ action: 'GetWorkouts' });
      sendMessage({ action: 'GetNutritionLogs' });
      sendMessage({ action: 'RequestWorkout' }); // Request initial suggestion

      // Poll for workouts
      let fetchedWorkouts: WorkoutData[] = [];
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const data = await readState(userAddress + "-workouts");
          if (data) {
            fetchedWorkouts = data;
            break;
          }
        } catch (e) { /* ignore error, retry */ }
      }
      setWorkouts(fetchedWorkouts);

      // Poll for nutrition logs
      let fetchedNutritionLogs: NutritionData[] = [];
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const data = await readState(userAddress + "-nutrition");
          if (data) {
            fetchedNutritionLogs = data;
            break;
          }
        } catch (e) { /* ignore error, retry */ }
      }
      setNutritionLogs(fetchedNutritionLogs);

      // Poll for suggested workout
      let fetchedSuggestedWorkout: SuggestedExercise[] | null = null;
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const data = await readState(userAddress + "-suggestion");
          if (data) {
            fetchedSuggestedWorkout = data;
            break;
          }
        } catch (e) { /* ignore error, retry */ }
      }
      setSuggestedWorkout(fetchedSuggestedWorkout);

      console.log("App data loaded.");
    } catch (error) {
      console.error('Failed to load app data:', error);
    }
  }, []);

  const loadUserProfile = useCallback(async () => {
    if (!address) return;
    
    console.log("Attempting to load user profile...");
    setIsRegistered(null); // Set loading state

    try {
      // Ask the agent to cache the profile.
      // We don't wait for this message to be processed, we just fire and forget.
      sendMessage({ action: 'GetProfile' });

      // Poll the cache for the profile data
      let profile = null;
      for (let i = 0; i < 5; i++) { // Try 5 times with a 1-second delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const data = await readState(address);
          if (data) {
            console.log("Profile found:", data);
            profile = data;
            break; // Profile found, exit loop
          }
        } catch (e) {
          console.log(`Attempt ${i + 1} to read profile failed, retrying...`);
        }
      }

      if (profile) {
        setUserData(profile);
        setIsRegistered(true);
        loadAppData(address); // Call new function to load other app data
      } else {
        console.log("Profile not found after polling. User is not registered.");
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setIsRegistered(false);
    }
  }, [address, loadAppData]);

  useEffect(() => {
    if (connected) {
      loadUserProfile();
    }
  }, [connected, loadUserProfile]);

  const handleRequestNewWorkout = async () => {
    console.log("Requesting new workout from AI agent...");
    if (!address) return;

    try {
      await sendMessage({ action: 'RequestWorkout' });

      let newSuggestion: SuggestedExercise[] | null = null;
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const data = await readState(address + "-suggestion");
          if (data) {
            newSuggestion = data;
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

  if (!connected) return <LandingPage onGetStarted={connect} />;
  if (isRegistered === null) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onProfileClick={() => {}} />
      <RegistrationModal isOpen={!isRegistered} onComplete={(data) => { setUserData(data); setIsRegistered(true); loadUserProfile(); }} />
      {isRegistered && userData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <WorkoutCard workouts={workouts} suggestedWorkout={suggestedWorkout} onRequestNewWorkout={handleRequestNewWorkout} />
              <NutritionCard nutritionLogs={nutritionLogs} onLogMeal={() => setShowLogNutrition(true)} />
            </div>
            <div className="space-y-8">
              <MotivationCard />
              <ProgressCard onLogProgress={() => setShowLogWorkout(true)} />
            </div>
          </div>
        </main>
      )}
      <LogWorkoutModal isOpen={showLogWorkout} onClose={() => setShowLogWorkout(false)} />
      <LogNutritionModal isOpen={showLogNutrition} onClose={() => setShowLogNutrition(false)} />
    </div>
  );
}

export default App;
