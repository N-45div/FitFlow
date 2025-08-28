import { useState } from 'react';
import { Heart, Zap, User, Settings, LogOut } from 'lucide-react';
import { ConnectButton } from 'arweave-wallet-kit';

interface HeaderProps {
  onProfileClick: () => void;
}

export default function Header({ onProfileClick }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg border-b border-orange-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-white" fill="currentColor" />
              <Zap className="h-4 w-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-white">🤖 AI Wellness Coach</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1">
              <ConnectButton />
            </div>
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-xl border border-orange-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onProfileClick();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-orange-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 transition-all duration-200 font-medium"
                    >
                      <Settings className="h-4 w-4 mr-3 text-orange-600" />
                      👤 Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-orange-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 transition-all duration-200 font-medium">
                      <LogOut className="h-4 w-4 mr-3 text-orange-600" />
                      🚪 Logout
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