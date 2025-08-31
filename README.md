# 🤖 AI Wellness Coach - AO Autonomous Agent

> **A complete guide to building autonomous AI agents on Arweave's AO protocol with 72+ hour operation**

[![AO Protocol](https://img.shields.io/badge/AO-Protocol-orange)](https://ao.arweave.dev/)
[![Arweave](https://img.shields.io/badge/Arweave-Permanent-yellow)](https://arweave.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🌟 What You'll Learn

This project demonstrates how to build a **fully autonomous AI wellness coach** that runs continuously on Arweave's AO protocol. Perfect for hackathons, competitions, and learning AO development!

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
git clone <your-repo-url>
cd flowiq/project
npm install
```

### 2. Deploy Your Agent
```bash
npm run deploy-agent
```
*Note: This automatically generates a wallet and deploys to AO. Your new process ID will be: `rUSeoWKlj0awVosFeerZklwjryHxoeUYxIA8v0WrlrQ`*

### 3. Start Development
```bash
npm run dev
```

🎉 **That's it!** Your autonomous AI agent with advanced workout intelligence is now running on AO legacynet!

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
project/
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

# View agent logs
npm run logs
```

### Production Deployment

#### 1. **Frontend (Netlify/Vercel)**
```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### 2. **Agent Monitoring**
```lua
-- Add health check endpoint
Handlers.add("HealthCheck",
  Handlers.utils.hasMatchingTag("Action", "HealthCheck"),
  function(msg)
    ao.send({
      Target = msg.From,
      Action = "HealthResponse",
      Data = json.encode({
        status = "healthy",
        uptime = os.time() - StartTime,
        users = #Users,
        messages_processed = MessageCount
      })
    })
  end
)
```

## 🧪 Testing Your Agent

### Unit Tests
```javascript
// test/agent.test.js
const { test } = require('node:test');
const assert = require('node:assert');

test('User registration', async () => {
  const result = await ao.dryrun({
    process: PROCESS_ID,
    tags: [
      { name: "Action", value: "Register" },
      { name: "Age", value: "25" },
      { name: "Gender", value: "male" }
    ]
  });
  
  assert.strictEqual(result.Messages[0].Tags.Status, "Success");
});
```

### Integration Tests
```bash
# Test autonomous behavior
node test/autonomous.test.js

# Test message handling
node test/messages.test.js

# Performance testing
node test/load.test.js
```

## 🏆 Competition Tips

### For Hackathons
1. **Start with this template** - Save 80% setup time
2. **Focus on unique features** - Build on the solid foundation
3. **Demonstrate autonomy** - Show 72+ hour operation
4. **Beautiful UI** - Use the warm theme as inspiration
5. **Document everything** - Judges love good docs

### Performance Optimization
```lua
-- Batch operations for efficiency
local function batchNotifications()
  local batch = {}
  for userId, notifications in pairs(PendingNotifications) do
    table.insert(batch, {
      target = userId,
      data = notifications
    })
  end
  
  -- Send all at once
  for _, item in ipairs(batch) do
    ao.send(item)
  end
  
  PendingNotifications = {}
end
```

## 🤝 Contributing

### Adding New Features
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Update agent logic**: Modify `agent/wellness-agent.lua`
4. **Update frontend**: Add React components in `src/components/`
5. **Test thoroughly**: Run all tests
6. **Submit PR**: Include demo and documentation

### Code Style
```lua
-- Lua conventions
local function camelCase() end
local CONSTANTS = "UPPERCASE"
local variables = "lowercase"

-- Always validate inputs
local function validateInput(data)
  assert(type(data) == "table", "Input must be table")
  assert(data.required_field, "Missing required field")
end
```

## 📖 Resources & Learning

### Essential Reading
- [AO Protocol Documentation](https://ao.arweave.dev/)
- [Arweave Developer Guide](https://docs.arweave.org/)
- [Lua Programming Guide](https://www.lua.org/manual/5.4/)

### Community
- [AO Discord](https://discord.gg/arweave)
- [Arweave Reddit](https://reddit.com/r/arweave)
- [Developer Forums](https://community.arweave.org/)

### Advanced Topics
- **Cross-process Communication**: Message passing between agents
- **Economic Models**: Token integration and incentives
- **Scalability Patterns**: Handling millions of users
- **Security Auditing**: Best practices for production

## 🐛 Troubleshooting

### Common Issues

#### Agent Not Responding
```bash
# Check process status
curl -X POST https://cu.ao-testnet.xyz/dry-run \
  -H "Content-Type: application/json" \
  -d '{
    "process": "YOUR_PROCESS_ID",
    "tags": [{"name": "Action", "value": "HealthCheck"}]
  }'
```

#### Wallet Connection Issues
```typescript
// Check wallet connection
const checkWallet = async () => {
  try {
    const address = await window.arweaveWallet.getActiveAddress();
    console.log("Connected:", address);
  } catch (error) {
    console.error("Wallet not connected:", error);
  }
};
```

#### Message Delivery Problems
```lua
-- Add message logging
Handlers.add("MessageLogger",
  function(msg) return true end,
  function(msg)
    print("Received message: " .. msg.Action .. " from " .. msg.From)
  end
)
```
## 📄 License

MIT License - Feel free to use this in competitions, hackathons, and commercial projects!

## 🙏 Acknowledgments

- **Arweave Team** - For the incredible AO protocol
- **Community Contributors** - For testing and feedback
- **Open Source Libraries** - React, TypeScript, TailwindCSS

---

**Ready to build the future of autonomous AI?** 🚀

[Get Started Now](#quick-start-5-minutes) | [Join Community](https://discord.gg/arweave)
