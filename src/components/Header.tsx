import React, { useState } from 'react';
import { Heart, Zap, User, Settings, LogOut } from 'lucide-react';
import { ConnectButton } from 'arweave-wallet-kit';

interface HeaderProps {
  onProfileClick: () => void;
}

export default function Header({ onProfileClick }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-green-500" fill="currentColor" />
              <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AI Wellness Coach</h1>
          </div>

          <div className="flex items-center space-x-4">
            <ConnectButton />
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onProfileClick();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}