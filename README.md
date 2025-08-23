# AI Wellness Dashboard on AO

A fully decentralized wellness coach built on the Actor-Oriented (AO) protocol. This application provides personalized workout suggestions and tracks user progress, with all data stored permanently on the Arweave permaweb.

![Dashboard Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Replace with an actual screenshot -->

---

## Features

- **Decentralized Identity**: Users log in and authenticate using their Arweave wallet.
- **Persistent & Ownable Data**: All user data (profile, workouts, meals) is stored in a user-owned SQLite database within an AO process.
- **AI-Powered Suggestions**: The agent provides workout suggestions based on the user's stated goals and fitness level.
- **Activity Logging**: Functionality to log daily workouts and meals.
- **Data Visualization**: A clean dashboard to view recent activity history.
- **Warm & Modern UI**: The user interface is built with a warm, inviting orange and yellow color palette.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Wallet Integration**: Arweave Wallet Kit
- **Backend Protocol**: AO (Actor-Oriented)
- **Storage Layer**: Arweave
- **Agent**: Lua with a built-in SQLite database

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: Make sure you have Node.js (v18 or higher) installed.
- **`aos` CLI**: You need the command-line tool for AO. Install it globally by running:
  ```sh
  npm i -g https://get_ao.g8way.io
  ```

### 1. Clone & Install Dependencies

Clone the repository and install the necessary npm packages.

```sh
npm install
```

### 2. Launch the Backend Agent

The backend logic resides in an AO process. You need to launch your own instance of it.

- **Start the `aos` process** with SQLite support:
  ```sh
  aos --sqlite
  ```
- **Load the agent script**. The latest version of the agent is in the `/agent` directory. Run the following command inside your `aos` shell:
  ```sh
  .load agent/wellness-agent-v3.lua
  ```
- **Copy the Process ID**. After loading, `aos` will provide you with your unique Process ID (e.g., `U-gmQ13jTAlso2r9DjTMDGjGYK4gqSbHxAq6vl65wBk`). Copy this ID.

### 3. Configure the Frontend

You need to tell the frontend application how to communicate with your new agent.

- **Open the file**: `src/lib/ao.ts`
- **Update the `AO_PROCESS_ID`**: Replace the placeholder Process ID with the one you copied in the previous step.

```typescript
// src/lib/ao.ts

// Replace this with your actual Process ID
export const AO_PROCESS_ID = "YOUR_PROCESS_ID_HERE"; 
```

### 4. Run the Application

Now you can start the frontend development server.

```sh
npm run dev
```

Open your browser to `http://localhost:5173` (or the address provided) to see the application running.

## How to Use

1.  **Connect Wallet**: Click the "Connect" button in the header to link your Arweave wallet.
2.  **Register**: If you are a new user, a registration form will appear. Fill it out to personalize your experience.
3.  **Get Suggestions**: Click "Request New Workout" to get an AI-generated workout plan.
4.  **Log Activities**: Use the "Log Workout" and "Log Meal" buttons to save your daily activities to the permaweb.
5.  **View History**: Your most recent activities will appear in the respective cards on the dashboard.

---

*This project serves as a comprehensive example of building full-stack, decentralized applications on the AO protocol.*
