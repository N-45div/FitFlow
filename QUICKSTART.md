# ⚡ AO Agent Quick Start Guide

> **Get your autonomous AI agent running on Arweave in 5 minutes!**

## 🎯 What You'll Build

An autonomous AI agent that:
- ✅ Runs 72+ hours continuously 
- ✅ Stores data permanently on Arweave
- ✅ Responds to user messages
- ✅ Performs autonomous tasks
- ✅ Has a beautiful React frontend

## 🚀 Step 1: Setup (2 minutes)

```bash
# Clone the project
git clone <your-repo>
cd flowiq/project

# Install dependencies
npm install

# Generate wallet (KEEP SECURE!)
node -e "
const Arweave = require('arweave');
const fs = require('fs');
Arweave.init({}).wallets.generate().then(key => {
  fs.writeFileSync('wallet.json', JSON.stringify(key));
  console.log('✅ Wallet generated!');
});
"
```

## 🤖 Step 2: Deploy Agent (1 minute)

```bash
# Deploy to AO legacynet
npm run deploy-agent

# You'll see:
# ✅ Process spawned: abc123...
# ✅ Agent code deployed!
# 📝 Process ID saved
```

## 🎨 Step 3: Start Frontend (1 minute)

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Connect your Arweave wallet
# Register and start chatting!
```

## 🔄 Step 4: Enable Autonomous Mode (1 minute)

In your browser:
1. Connect wallet
2. Register your profile
3. The agent automatically starts autonomous operation!

## ✅ Verification

Your agent should now be:
- 🟢 **Running autonomously** - Check the status indicator
- 🟢 **Responding to messages** - Try sending "hello"
- 🟢 **Generating insights** - View notifications panel
- 🟢 **Persisting data** - Refresh page, data remains

## 🎉 Success!

You now have a fully autonomous AI agent running on AO! 

**Next Steps:**
- Customize the agent logic in `agent/wellness-agent.lua`
- Modify the UI in `src/components/`
- Add new features and autonomous behaviors
- Deploy to production

## 🆘 Need Help?

**Common Issues:**
- **Wallet not connecting?** Install ArConnect browser extension
- **Agent not responding?** Check process ID in `src/lib/ao.ts`
- **Build errors?** Ensure Node.js 18+ is installed

**Resources:**
- 📖 [Full Documentation](./README.md)
- 🧑‍💻 [Code Examples](./EXAMPLES.md)
- 💬 [AO Discord](https://discord.gg/arweave)
- 🌐 [AO Documentation](https://ao.arweave.dev/)

---

**Ready to win that hackathon?** 🏆 This template gives you a massive head start!
