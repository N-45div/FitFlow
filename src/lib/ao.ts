import { createDataItemSigner, connect } from "@permaweb/aoconnect";

// The Process ID of the agent we created
export const AO_PROCESS_ID = "iqbEiX4lDMdnoovmUr79JbuBryxn8xcv6zRtQPpWEew";

// Configure the library with all necessary parameters  
const { message, result } = connect({
  MODE: "legacy"
});

// Interface for our API calls
interface SendMessageArgs {
  action: string;
  tags?: { name: string; value: string }[];
  data?: string;
}

/**
 * Check if wallet is connected and available
 */
const checkWalletConnection = (): boolean => {
  if (!(globalThis as any).arweaveWallet) {
    console.error('Arweave wallet not found. Please install ArConnect.');
    return false;
  }
  return true;
};

/**
 * Sends a message to our AO Process. This is used for write operations.
 * @param {SendMessageArgs} args - The arguments for the message.
 */
export const sendMessage = async ({ action, tags = [], data = "" }: SendMessageArgs) => {
  if (!checkWalletConnection()) {
    throw new Error('Arweave wallet not found.');
  }

  try {
    // Create the signer using globalThis.arweaveWallet as per AO docs
    const signer = createDataItemSigner((globalThis as any).arweaveWallet);

    const messageId = await message({
      process: AO_PROCESS_ID,
      tags: [{ name: "Action", value: action }, ...tags],
      data,
      signer,
    });
    
    console.log(`Message sent successfully: ${messageId}`);
    return messageId;
  } catch (error) {
    console.error("Error sending message to AO:", error);
    throw error;
  }
};

/**
 * Gets the result of a message sent to our AO Process.
 * This is the legacynet way for read operations.
 * @param {string} messageId - The message ID to get results for.
 */
export const getMessageResult = async (messageId: string) => {
  try {
    const messageResult = await result({
      message: messageId,
      process: AO_PROCESS_ID,
    });
    return messageResult;
  } catch (error) {
    console.error(`Error getting result for message ${messageId}:`, error);
    throw error;
  }
};
