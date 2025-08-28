import React from 'react';

interface UserData {
  wallet_address: string;
  registration_date: number;
  age: number;
  gender: string;
  fitness_level: string;
  goal: string;
  weight: number;
  height: number;
}

interface ProfilePageProps {
  userData: UserData | null;
  onSignOut: () => void;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData, onSignOut, onClose }) => {
  if (!userData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="space-y-2">
          <p><strong>Wallet Address:</strong> {userData.wallet_address}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Fitness Level:</strong> {userData.fitness_level}</p>
          <p><strong>Goal:</strong> {userData.goal}</p>
          <p><strong>Weight:</strong> {userData.weight} kg</p>
          <p><strong>Height:</strong> {userData.height} cm</p>
        </div>
        <div className="mt-6 flex justify-between">
          <button onClick={onSignOut} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
