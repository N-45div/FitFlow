# 🚀 AO Agent Code Examples

## Basic Agent Template
```lua
-- agent/basic-agent.lua
local json = require("json")

-- State initialization
Users = Users or {}
Messages = Messages or {}

-- Helper function
local function reply(msg, data)
  ao.send({
    Target = msg.From,
    Data = json.encode(data)
  })
end

-- User registration
Handlers.add("Register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function(msg)
    Users[msg.From] = {
      name = msg.Tags.Name,
      registered_at = msg.Timestamp
    }
    reply(msg, { success = true, message = "Registered!" })
  end
)

-- Message handling
Handlers.add("SendMessage",
  Handlers.utils.hasMatchingTag("Action", "SendMessage"),
  function(msg)
    table.insert(Messages, {
      from = msg.From,
      content = msg.Data,
      timestamp = msg.Timestamp
    })
    reply(msg, { success = true, id = #Messages })
  end
)
```

## Autonomous Behavior
```lua
-- Self-triggering autonomous loop
local function startAutonomous()
  ao.send({
    Target = ao.id,
    Action = "AutonomousTick",
    Data = "Starting autonomous operation"
  })
end

Handlers.add("AutonomousTick",
  Handlers.utils.hasMatchingTag("Action", "AutonomousTick"),
  function(msg)
    -- Perform autonomous tasks
    performTasks()
    
    -- Schedule next tick (1 hour)
    ao.send({
      Target = ao.id,
      Action = "AutonomousTick",
      ["Delay"] = "3600000" -- 1 hour in milliseconds
    })
  end
)
```

## React Frontend Integration
```typescript
// Frontend connection utility
import { connect, createDataItemSigner } from '@permaweb/aoconnect';

const PROCESS_ID = 'your-process-id';
const ao = connect();

export const sendMessage = async (action: string, tags: any[] = [], data = '') => {
  const signer = createDataItemSigner(window.arweaveWallet);
  
  return await ao.message({
    process: PROCESS_ID,
    signer,
    tags: [{ name: 'Action', value: action }, ...tags],
    data
  });
};

export const queryAgent = async (action: string) => {
  const result = await ao.dryrun({
    process: PROCESS_ID,
    tags: [{ name: 'Action', value: action }]
  });
  
  return result.Messages?.[0] ? JSON.parse(result.Messages[0].Data) : null;
};
```

## Deployment Script
```javascript
// deploy-agent.js
const { connect, createDataItemSigner } = require('@permaweb/aoconnect');
const fs = require('fs');

async function deploy() {
  const wallet = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
  const signer = createDataItemSigner(wallet);
  const ao = connect();
  
  // Spawn process
  const processId = await ao.spawn({
    module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk",
    scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
    signer,
    tags: [{ name: "Name", value: "My-Agent" }]
  });
  
  // Deploy code
  const code = fs.readFileSync('./agent/agent.lua', 'utf8');
  await ao.message({
    process: processId,
    signer,
    tags: [{ name: "Action", value: "Eval" }],
    data: code
  });
  
  console.log('Deployed:', processId);
  return processId;
}

deploy().catch(console.error);
```
