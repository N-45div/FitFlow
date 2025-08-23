import { createDataItemSigner, connect, message } from "@permaweb/aoconnect";

// The Process ID of the agent we created
export const AO_PROCESS_ID = "U-gmQ13jTAlso2r9DjTMDGjGYK4gqSbHxAq6vl65wBk";

// Base URL for the Compute Unit
const CU_URL = "https://cu.ao-testnet.xyz";

// This is the signer for the user's wallet. It must be created before connect().
const signer = createDataItemSigner(window.arweaveWallet);

// Configure the library with all necessary parameters
connect({
  MODE: "mainnet",
  GATEWAY_URL: "https://arweave.net",
  CU_URL: CU_URL,
  MU_URL: "https://mu.ao-testnet.xyz",
  signer,
});

// Interface for our API calls
interface SendMessageArgs {
  action: string;
  tags?: { name: string; value: string }[];
  data?: string;
}

/**
 * Sends a message to our AO Process. This is used for write operations.
 * @param {SendMessageArgs} args - The arguments for the message.
 */
export const sendMessage = async ({ action, tags = [], data = "" }: SendMessageArgs) => {
  try {
    const messageId = await message({
      process: AO_PROCESS_ID,
      tags: [{ name: "Action", value: action }, ...tags],
      data,
    });
    return messageId;
  } catch (error) {
    console.error("Error sending message to AO:", error);
    throw error;
  }
};

/**
 * Reads the patched state of a key from our AO Process.
 * This is the recommended way for read operations on HyperBEAM.
 * @param {string} key - The key of the state to read.
 */
export const readState = async (key: string) => {
  const url = `${CU_URL}/${AO_PROCESS_ID}/cache/${key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch state for key ${key}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading state for key ${key}:`, error);
    throw error;
  }
};
