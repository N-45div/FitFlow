# 🤖 AI Wellness Coach - AO Autonomous Agent

> **A complete guide plus how we built autonomous AI agent on Arweave's AO protocol with 72+ hour operation**

[![AO Protocol](https://img.shields.io/badge/AO-Protocol-orange)](https://ao.arweave.dev/)
[![Arweave](https://img.shields.io/badge/Arweave-Permanent-yellow)](https://arweave.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

### Key Features Built
- ✅ **72+ Hour Autonomous Operation** - Self-triggering agent loops
- ✅ **Persistent Data Storage** - All data stored permanently on Arweave
- ✅ **Advanced AI Workout Intelligence** - Context-aware, progressive workout recommendations
- ✅ **Biometric-Based Adaptation** - Workouts adapt to mood, sleep, and energy levels
- ✅ **Real-time AI Insights** - Personalized health recommendations with explanations
- ✅ **Modern React Frontend** - Beautiful, responsive UI with AI insights display
- ✅ **Wallet Integration** - Seamless Arweave wallet connection
- ✅ **Message-based Architecture** - Scalable AO process communication

## 🚀 Quick Start (5 Minutes)

### Prerequisites
```bash
# Node.js 18+ and npm
node --version  # Should be 18+
npm --version   # Should be 8+

# Git
git --version
```

### 1. Clone & Install
```bash
git clone https://github.com/N-45div/FitFlow.git
npm install
```

### 2. Deploy Your Agent
```bash
npm run deploy-agent
```

### 3. Start Development
```bash
npm run dev
```

🎉 **That's it!** Your autonomous AI agent with advanced workout intelligence is now running on AO legacynet!

## 🌐 Network Deployment: Legacynet vs Mainnet

Fitflow is currently deployed on **AO Legacynet** for several important reasons:

### Why Legacynet?
- **Stability**: Legacynet is a battle-tested environment with proven reliability
- **Maturity**: The ecosystem tooling and documentation are more mature
- **Consistency**: Better compatibility with existing AO infrastructure
- **Testing**: More thoroughly tested for long-running autonomous agents

### Mainnet Considerations
While AO Mainnet is available, we recommend using Legacynet for now because:
- Mainnet is still in early stages
- Some features may behave differently
- Higher confidence in data persistence on Legacynet

Our current deployment is on **Legacynet** with process ID:
```
LAUcVFHNqenk6iPBvQDao-mcZSXFOlF0dKeKHtv73_g
```


## 📚 Complete Tutorial

### Understanding AO Architecture

**AO (Autonomous Objects)** is Arweave's hyper-parallel computer that enables:
- **Permanent Storage**: All data persists forever
- **Autonomous Execution**: Processes run independently 
- **Message Passing**: Secure, verifiable communication
- **Infinite Scalability**: No computational limits

### Core Components Explained

#### 1. **AO Process (Lua Agent)**
```lua
-- wellness-agent.lua
local json = require("json")

-- State management
Users = Users or {}
Workouts = Workouts or {}
Notifications = Notifications or {}

-- Message handlers
Handlers.add("Register", 
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function(msg)
    -- User registration logic
    Users[msg.From] = {
      age = msg.Tags.Age,
      gender = msg.Tags.Gender,
      -- ... more fields
    }
    print("User registered: " .. msg.From)
  end
)
```

#### 2. **Frontend Integration (React + TypeScript)**
```typescript
// src/lib/ao.ts
import { connect, createDataItemSigner } from '@permaweb/aoconnect';

const ao = connect();

export const sendMessage = async (data: any) => {
  return await ao.message({
    process: PROCESS_ID,
    tags: [
      { name: "Action", value: data.action },
      ...data.tags
    ],
    signer: createDataItemSigner(window.arweaveWallet),
  });
};
```

#### 3. **Autonomous Behavior Implementation**
```lua
-- Self-triggering autonomous loop
local function startAutonomousOperation()
  -- Send message to self every 24 hours
  ao.send({
    Target = ao.id,
    Action = "DailyAnalysis",
    Data = "Autonomous trigger"
  })
end

-- Daily analysis handler
Handlers.add("DailyAnalysis",
  Handlers.utils.hasMatchingTag("Action", "DailyAnalysis"),
  function(msg)
    performHealthAnalysis()
    generateInsights()
    sendNotifications()
    
    -- Schedule next analysis
    startAutonomousOperation()
  end
)
```

## 🏗️ Project Structure

```
FitFlow/
├── agent/
│   └── wellness-agent.lua      # AO process logic
├── src/
│   ├── components/             # React components
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── wellness/          # Wellness-specific UI
│   │   └── *.tsx             # Individual components
│   ├── lib/
│   │   └── ao.ts             # AO connection utilities
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── deploy-agent.js           # Deployment script
├── wallet.json              # Generated wallet (keep secure!)
└── package.json            # Dependencies
```

## 🔧 Key Implementation Details

### 1. **Wallet Management**
```javascript
// deploy-agent.js
const wallet = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
const signer = createDataItemSigner(wallet);

const processId = await ao.spawn({
  module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk",
  scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  signer,
  tags: [
    { name: "Name", value: "AI-Wellness-Coach" },
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-J4y8ZZ09Y" }
  ]
});
```

### 2. **State Persistence**
```lua
-- All state is automatically persisted on Arweave
Users = Users or {}  -- Persistent user data
Workouts = Workouts or {}  -- Workout history
DailyCheckIns = DailyCheckIns or {}  -- Health metrics

-- Data survives process restarts and updates
```

### 3. **Real-time Communication**
```typescript
// Polling for new messages
const fetchNotifications = async () => {
  const result = await ao.dryrun({
    process: PROCESS_ID,
    tags: [{ name: "Action", value: "GetNotifications" }],
  });
  
  return JSON.parse(result.Messages[0]?.Data || "[]");
};
```

## 🎯 Advanced Features

### Autonomous Health Analysis
```lua
local function performHealthAnalysis()
  for userId, userData in pairs(Users) do
    local recentCheckIns = getRecentCheckIns(userId)
    local trends = analyzeTrends(recentCheckIns)
    
    if trends.mood_declining then
      sendNotification(userId, {
        type = "health_alert",
        message = "Your mood has been declining. Consider meditation or talking to someone.",
        priority = "high"
      })
    end
    
    if trends.low_activity then
      suggestWorkout(userId)
    end
  end
end

## 🧠 **Advanced AI Workout Intelligence**

### **1. Context-Aware Adaptive System**
The AI analyzes multiple data points to generate personalized workouts:

- **Biometric Analysis**: Mood, sleep quality, energy levels from daily check-ins
- **Recovery Detection**: Automatically suggests gentle workouts for poor sleep/low mood
- **Progressive Adaptation**: Difficulty scales with user experience (1.2x → 1.6x multiplier)
- **Time-Based Optimization**: Morning energizers, afternoon power sessions, evening recovery
- **Multi-Modal Intelligence**: Combines wellness data, workout history, and user preferences

### **2. Smart Personalization Algorithm**
```lua
-- Real implementation in your agent
function calculateUserContext(userAddress)
  -- Analyzes last 7 days of check-ins
  -- Calculates mood, sleep, energy trends
  -- Determines optimal workout intensity
  return personalization_score -- 1-10 rating
end
```

### Smart Workout Recommendations
```lua
local function suggestWorkout(userId)
  local user = Users[userId]
  local fitnessLevel = user.fitness_level
  local lastWorkout = getLastWorkout(userId)
  
  local suggestion = generateWorkoutSuggestion(fitnessLevel, lastWorkout)
  
  sendNotification(userId, {
    type = "workout_reminder",
    message = "Time for a " .. suggestion.type .. " workout!",
    data = suggestion
  })
end
```

## 🔐 Security Best Practices

### 1. **Wallet Security**
```bash
# Never commit wallet.json to version control
echo "wallet.json" >> .gitignore

# Use environment variables in production
export WALLET_PATH="/secure/path/wallet.json"
```

### 2. **Message Validation**
```lua
local function validateUser(msg)
  if not Users[msg.From] then
    ao.send({
      Target = msg.From,
      Action = "Error",
      Data = "User not registered"
    })
    return false
  end
  return true
end
```

### 3. **Rate Limiting**
```lua
local MessageCounts = {}

local function checkRateLimit(userId)
  local now = os.time()
  local count = MessageCounts[userId] or { count = 0, window = now }
  
  if now - count.window > 60 then -- Reset every minute
    MessageCounts[userId] = { count = 1, window = now }
    return true
  end
  
  if count.count >= 10 then -- Max 10 messages per minute
    return false
  end
  
  count.count = count.count + 1
  return true
end
```

## 🚀 Deployment Guide

### Local Development
```bash
# Start development server
npm run dev

# Deploy agent to testnet
npm run deploy-agent

```
## 📄 License

MIT License - Feel free to use this in competitions, hackathons, and commercial projects!

## 🙏 Acknowledgments

- **Arweave Team** - For the incredible AO protocol
- **Open Source Libraries** - React, TypeScript, TailwindCSS
