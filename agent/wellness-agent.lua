-- Unified Wellness Agent using in-memory state
-- This version consolidates all features and uses a Lua table for state
-- to ensure compatibility with modern AO frontend architecture.

-- Global table for storing all application data.
-- This is simpler and more compatible with the caching mechanism than SQLite.
State = State or {
  UserProfiles = {},
  Workouts = {},
  NutritionLogs = {}
}

json = require("json")

-- Predefined workout suggestions from V3
local workoutSuggestions = {
  beginner = {
    ["weight-loss"] = { { name = "Full Body Circuit", details = "3 rounds" }, { name = "Brisk Walking", details = "30 minutes" } },
    ["muscle-gain"] = { { name = "Intro to Bodybuilding", details = "3 sets x 12 reps" }, { name = "Bodyweight Squats", details = "3 sets" } },
    ["general-health"] = { { name = "Yoga for Beginners", details = "20 minutes" }, { name = "Light Jogging", details = "15 minutes" } }
  },
  intermediate = {
    ["weight-loss"] = { { name = "HIIT Cardio", details = "20 minutes" }, { name = "Jump Rope", details = "15 minutes" } },
    ["muscle-gain"] = { { name = "Push/Pull/Legs Split", details = "Day 1: Push" }, { name = "Deadlifts", details = "5x5" } },
    ["general-health"] = { { name = "Swimming", details = "30 minutes" }, { name = "Cycling", details = "45 minutes" } }
  },
  advanced = {
    ["weight-loss"] = { { name = "Advanced HIIT", details = "25 minutes" }, { name = "Sprint Intervals", details = "20 minutes" } },
    ["muscle-gain"] = { { name = "5/3/1 Program", details = "Week 1, Day 1" }, { name = "Olympic Lifts", details = "Practice session" } },
    ["general-health"] = { { name = "Triathlon Training", details = "Brick workout" }, { name = "Trail Running", details = "60 minutes" } }
  }
}

-- Patches a user's profile to the cache for the frontend to read.
function cacheProfile(userAddress)
  local userProfile = State.UserProfiles[userAddress]
  if userProfile then
    ao.send({
      device = 'patch@1.0',
      cache = { [userAddress] = json.encode(userProfile) }
    })
    print("Profile for " .. userAddress .. " has been cached.")
  end
end

--- Handlers ---

-- Handler for User Registration and Profile Updates
Handlers.add(
  "Register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    local userAddress = msg.From
    
    State.UserProfiles[userAddress] = {
      age = tonumber(msg.Tags.Age) or 0,
      gender = msg.Tags.Gender or "N/A",
      fitness_level = msg.Tags.FitnessLevel or "N/A",
      goal = msg.Tags.Goal or "N/A",
      weight = tonumber(msg.Tags.Weight) or 0,
      height = tonumber(msg.Tags.Height) or 0,
      registration_date = msg.Timestamp
    }

    cacheProfile(userAddress)

    print("User profile created/updated for: " .. userAddress)
    Handlers.utils.reply("Success: User profile saved for " .. userAddress)(msg)
  end
)

-- Handler for the frontend to request a user's profile
Handlers.add(
  "GetProfile",
  Handlers.utils.hasMatchingTag("Action", "GetProfile"),
  function (msg)
    local userAddress = msg.From
    local userProfile = State.UserProfiles[userAddress]

    if userProfile then
      cacheProfile(userAddress)
      Handlers.utils.reply(json.encode(userProfile))(msg)
    else
      Handlers.utils.reply("Error: User profile not found.")(msg)
    end
  end
)

-- Handler for Logging a Workout
Handlers.add(
  "LogWorkout",
  Handlers.utils.hasMatchingTag("Action", "LogWorkout"),
  function (msg)
    local userAddress = msg.From
    if not State.Workouts[userAddress] then State.Workouts[userAddress] = {} end
    
    table.insert(State.Workouts[userAddress], {
      type = msg.Tags.Type,
      duration = tonumber(msg.Tags.Duration),
      date = msg.Timestamp
    })
    
    print("Workout logged for: " .. userAddress)
    Handlers.utils.reply("Success: Workout logged.")(msg)
  end
)

-- Handler for Logging Nutrition
Handlers.add(
  "LogNutrition",
  Handlers.utils.hasMatchingTag("Action", "LogNutrition"),
  function (msg)
    local userAddress = msg.From
    if not State.NutritionLogs[userAddress] then State.NutritionLogs[userAddress] = {} end

    table.insert(State.NutritionLogs[userAddress], {
      food = msg.Tags.Food,
      calories = tonumber(msg.Tags.Calories),
      date = msg.Timestamp
    })

    print("Nutrition logged for: " .. userAddress)
    Handlers.utils.reply("Success: Nutrition logged.")(msg)
  end
)

-- Handler for workout suggestions
Handlers.add(
  "RequestWorkout",
  Handlers.utils.hasMatchingTag("Action", "RequestWorkout"),
  function(msg)
    local userProfile = State.UserProfiles[msg.From] or {}
    local fitnessLevel = userProfile.fitness_level or "beginner"
    local goal = userProfile.goal or "general-health"

    local suggestion = workoutSuggestions[fitnessLevel] and workoutSuggestions[fitnessLevel][goal] or workoutSuggestions.beginner["general-health"]

    print("Suggestion sent for " .. fitnessLevel .. "/" .. goal)
    Handlers.utils.reply(json.encode(suggestion))(msg)
  end
)

print("Unified Wellness Agent is loaded and ready.")