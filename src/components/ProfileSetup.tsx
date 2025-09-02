import React, { useState } from 'react';
import { UserData } from '../types/UserData';

interface ProfileSetupProps {
  initialData: UserData;
  onSubmit: (data: UserData) => Promise<void>;
  onClose: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Age</label>
            <input 
              type="number" 
              value={formData.age || ''}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block">Gender</label>
            <select 
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Not specified">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block">Fitness Level</label>
            <select 
              value={formData.fitness_level}
              onChange={(e) => setFormData({...formData, fitness_level: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block">Height (cm)</label>
            <input 
              type="number" 
              value={formData.height || ''}
              onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block">Weight (kg)</label>
            <input 
              type="number" 
              value={formData.weight || ''}
              onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6 flex justify-between">
            <button 
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
