import React, { useState } from 'react';

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
  onProfileSubmit: (data: UserData) => Promise<void>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData, onSignOut, onClose, onProfileSubmit }) => {
  if (!userData) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData || {
    wallet_address: '',
    registration_date: 0,
    age: 0,
    gender: '',
    fitness_level: '',
    goal: '',
    weight: 0,
    height: 0
  });

  const handleSave = async () => {
    await onProfileSubmit(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="space-y-2">
          <p><strong>Wallet Address:</strong> {isEditing ? <input type="text" value={formData.wallet_address} onChange={(e) => setFormData({ ...formData, wallet_address: e.target.value })} /> : formData.wallet_address}</p>
          <p><strong>Age:</strong> {isEditing ? <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })} /> : formData.age}</p>
          <p><strong>Gender:</strong> {isEditing ? <input type="text" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> : formData.gender}</p>
          <p><strong>Fitness Level:</strong> {isEditing ? <input type="text" value={formData.fitness_level} onChange={(e) => setFormData({ ...formData, fitness_level: e.target.value })} /> : formData.fitness_level}</p>
          <p><strong>Goal:</strong> {isEditing ? <input type="text" value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} /> : formData.goal}</p>
          <p><strong>Weight:</strong> {isEditing ? <input type="number" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })} /> : formData.weight} kg</p>
          <p><strong>Height:</strong> {isEditing ? <input type="number" value={formData.height} onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })} /> : formData.height} cm</p>
        </div>
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          )}
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
