import React from 'react';
import { Bot, Zap } from 'lucide-react';

const AutonomousStatus: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg shadow-sm border border-green-400">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Bot className="h-6 w-6" />
          <Zap className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">🤖 AI Agent Active</h4>
          <p className="text-xs text-green-100">
            Running autonomously • Analyzing your wellness data 24/7
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousStatus;
