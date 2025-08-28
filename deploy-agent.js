import { createDataItemSigner, spawn, message, result } from "@permaweb/aoconnect";
import fs from 'fs';

async function deployWellnessAgent() {
  try {
    console.log("🚀 Deploying Wellness Agent to AO...");
    
    // Read the agent code
    const agentCode = fs.readFileSync('./agent/wellness-agent.lua', 'utf8');
    
    // Read wallet from file
    const walletData = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
    
    // Create data item signer using wallet file
    const signer = createDataItemSigner(walletData);
    
    // Spawn a new AO process with proper scheduler
    console.log("📦 Spawning new AO process...");
    const processId = await spawn({
      module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk", // AO Lua module
      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA", // AO scheduler
      signer,
      tags: [
        { name: "App-Name", value: "WellnessAgent" },
        { name: "App-Version", value: "1.0" },
        { name: "Description", value: "AI Wellness Coach Agent" }
      ]
    });
    
    console.log(`✅ Process spawned with ID: ${processId}`);
    
    // Send the agent code to the process
    console.log("📝 Loading agent code...");
    const messageId = await message({
      process: processId,
      signer,
      tags: [
        { name: "Action", value: "Eval" }
      ],
      data: agentCode
    });
    
    console.log(`📤 Code sent with message ID: ${messageId}`);
    
    // Wait for the result
    console.log("⏳ Waiting for deployment confirmation...");
    const deployResult = await result({
      message: messageId,
      process: processId
    });
    
    console.log("🎉 Deployment complete!");
    console.log(`Process ID: ${processId}`);
    console.log("Update your ao.ts file with this new process ID");
    
    // Update the ao.ts file automatically
    const aoFilePath = './src/lib/ao.ts';
    let aoFileContent = fs.readFileSync(aoFilePath, 'utf8');
    
    // Replace the old process ID with the new one
    aoFileContent = aoFileContent.replace(
      /export const AO_PROCESS_ID = "[^"]+";/,
      `export const AO_PROCESS_ID = "${processId}";`
    );
    
    fs.writeFileSync(aoFilePath, aoFileContent);
    console.log("✅ Updated ao.ts with new process ID");
    
    return processId;
    
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

// Run deployment
deployWellnessAgent()
  .then(processId => {
    console.log(`\n🎯 Success! Your new process ID is: ${processId}`);
    console.log("You can now use your wellness agent!");
  })
  .catch(error => {
    console.error("\n💥 Deployment failed:", error.message);
    process.exit(1);
  });
