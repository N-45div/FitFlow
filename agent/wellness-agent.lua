-- Unified Wellness Agent using in-memory state
-- This version consolidates all features and uses a Lua table for state
-- to ensure compatibility with modern AO frontend architecture.

-- Global table for storing all application data.
-- This is simpler and more compatible with the caching mechanism than SQLite.

State = State or {
  UserProfiles = {},
  Workouts = {},
  NutritionLogs = {},
  DailyCheckIns = {},
  Notifications = {}
}

json = require("json")

-- Initial State for legacynet (no HyperBEAM patch device)
print("Wellness Agent initialized for legacynet. Ready for profile auto-creation.")

-- Persists the entire application state to Arweave.
-- This provides a backup and durable storage on the permaweb.
function persistState()
  print("Attempting to persist state to Arweave...")
  ao.send({
    Target = "arweave",
    Action = "post-data",
    Data = json.encode(State),
    Tags = {
      { name = "Content-Type", value = "application/json" },
      { name = "App-Name", value = "WellnessAgent" },
      { name = "Data-Version", value = "1.0" }
    }
  })
  print("State persistence message sent to Arweave.")
end

-- Advanced AI Workout System with Context Awareness
local workoutDatabase = {
  recovery = {
    low_energy = { { name = "Gentle Flow Yoga", details = "15 min" }, { name = "Walking Meditation", details = "10 min" } },
    poor_sleep = { { name = "Restorative Stretching", details = "20 min" }, { name = "Breathing Exercises", details = "5 min" } },
    high_stress = { { name = "Tai Chi", details = "25 min" }, { name = "Progressive Relaxation", details = "15 min" } }
  },
  
  mood_boost = {
    low_mood = { { name = "Dance Cardio", details = "20 min" }, { name = "Boxing Basics", details = "15 min" } },
    moderate_mood = { { name = "Interval Running", details = "25 min" }, { name = "Strength Circuit", details = "30 min" } },
    high_mood = { { name = "HIIT Challenge", details = "35 min" }, { name = "Rock Climbing", details = "45 min" } }
  },
  
  adaptive = {
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
  },
  
  time_based = {
    morning = { { name = "Energizing Flow", details = "20 min" }, { name = "Core Activation", details = "10 min" } },
    afternoon = { { name = "Power Lunch Workout", details = "15 min" }, { name = "Desk Stretches", details = "5 min" } },
    evening = { { name = "Stress Relief Yoga", details = "30 min" }, { name = "Cool Down Walk", details = "20 min" } }
  },
  
  weather_adaptive = {
    rainy = { { name = "Indoor Cardio Circuit", details = "25 min" }, { name = "Bodyweight HIIT", details = "20 min" } },
    sunny = { { name = "Outdoor Running", details = "30 min" }, { name = "Park Workout", details = "40 min" } },
    cold = { { name = "Warm-up Intensive", details = "35 min" }, { name = "Indoor Strength", details = "45 min" } }
  }
}

-- AI Workout Intelligence Functions
function calculateUserContext(userAddress)
  local user = State.UserProfiles[userAddress]
  local checkIns = State.DailyCheckIns[userAddress] or {}
  local workouts = State.Workouts[userAddress] or {}
  
  -- Get recent data (last 7 days)
  local recentCheckIns = {}
  local currentTime = os.time() * 1000
  local weekAgo = currentTime - (7 * 24 * 60 * 60 * 1000)
  
  for _, checkIn in pairs(checkIns) do
    if checkIn.date >= weekAgo then
      table.insert(recentCheckIns, checkIn)
    end
  end
  
  -- Calculate context scores
  local avgMood = 3 -- default
  local avgSleep = 7 -- default
  local avgEnergy = 5 -- default
  
  if #recentCheckIns > 0 then
    local totalMood, totalSleep, totalEnergy = 0, 0, 0
    for _, checkIn in ipairs(recentCheckIns) do
      totalMood = totalMood + (checkIn.mood or 3)
      totalSleep = totalSleep + (checkIn.sleep_hours or 7)
      totalEnergy = totalEnergy + (checkIn.activity_minutes or 30) / 6 -- normalize to 1-10 scale
    end
    avgMood = totalMood / #recentCheckIns
    avgSleep = totalSleep / #recentCheckIns
    avgEnergy = totalEnergy / #recentCheckIns
  end
  
  return {
    mood = avgMood,
    sleep = avgSleep,
    energy = avgEnergy,
    fitness_level = user and user.fitness_level or "beginner",
    goal = user and user.goal or "general-health",
    workout_count = #workouts
  }
end

function generateSmartWorkout(userAddress)
  local context = calculateUserContext(userAddress)
  local currentHour = tonumber(os.date("%H"))
  
  -- Priority-based workout selection
  
  -- 1. Recovery needed (poor sleep or low mood)
  if context.sleep < 6 or context.mood <= 2 then
    if context.sleep < 6 then
      return workoutDatabase.recovery.poor_sleep
    else
      return workoutDatabase.recovery.low_energy
    end
  end
  
  -- 2. Mood boost needed
  if context.mood <= 3 then
    if context.mood <= 2 then
      return workoutDatabase.mood_boost.low_mood
    else
      return workoutDatabase.mood_boost.moderate_mood
    end
  end
  
  -- 3. Time-based recommendations
  local timeOfDay = "morning"
  if currentHour >= 12 and currentHour < 17 then
    timeOfDay = "afternoon"
  elseif currentHour >= 17 then
    timeOfDay = "evening"
  end
  
  -- 4. Adaptive workout based on fitness level and goals
  local fitnessLevel = context.fitness_level
  local goal = context.goal
  
  if workoutDatabase.adaptive[fitnessLevel] and workoutDatabase.adaptive[fitnessLevel][goal] then
    local adaptiveWorkout = workoutDatabase.adaptive[fitnessLevel][goal]
    local timeWorkout = workoutDatabase.time_based[timeOfDay]
    
    -- Combine adaptive and time-based for variety
    if math.random() > 0.5 then
      return adaptiveWorkout
    else
      return timeWorkout
    end
  end
  
  -- Fallback to time-based
  return workoutDatabase.time_based[timeOfDay]
end

function generateProgressiveWorkout(userAddress)
  local context = calculateUserContext(userAddress)
  local workouts = State.Workouts[userAddress] or {}
  
  -- Calculate progression multiplier based on consistency
  local progressionLevel = 1.0
  if context.workout_count > 10 then
    progressionLevel = 1.2
  elseif context.workout_count > 20 then
    progressionLevel = 1.4
  elseif context.workout_count > 50 then
    progressionLevel = 1.6
  end
  
  local baseWorkout = generateSmartWorkout(userAddress)
  
  -- Enhance workout based on progression
  for i, exercise in ipairs(baseWorkout) do
    local duration = tonumber(exercise.details:match("%d+"))
    if duration then
      local newDuration = math.floor(duration * progressionLevel)
      baseWorkout[i].details = exercise.details:gsub("%d+", tostring(newDuration))
      baseWorkout[i].name = "💪 " .. exercise.name .. " (Progressive)"
    end
  end
  
  return baseWorkout
end

--- Response Functions for legacynet ---

-- Returns profile data directly via message reply (no caching needed)
function replyWithProfile(msg, userAddress)
  local userProfile = State.UserProfiles[userAddress]
  if userProfile then
    ao.send({
      Target = msg.From,
      Action = "ProfileData",
      Data = json.encode(userProfile)
    })
    print("Profile for " .. userAddress .. " sent directly.")
  end
end

-- Returns workout data directly via message reply
function replyWithWorkouts(msg, userAddress)
  local userWorkouts = State.Workouts[userAddress] or {}
  ao.send({
    Target = msg.From,
    Action = "WorkoutData",
    Data = json.encode(userWorkouts)
  })
  print("Workouts for " .. userAddress .. " sent directly.")
end

-- Returns nutrition data directly via message reply
function replyWithNutrition(msg, userAddress)
  local userNutrition = State.NutritionLogs[userAddress] or {}
  ao.send({
    Target = msg.From,
    Action = "NutritionData",
    Data = json.encode(userNutrition)
  })
  print("Nutrition logs for " .. userAddress .. " sent directly.")
end

-- Returns suggestion data directly via message reply
function replyWithSuggestion(msg, userAddress, suggestion)
  if suggestion then
    ao.send({
      Target = msg.From,
      Action = "SuggestionData",
      Data = json.encode(suggestion)
    })
    print("Suggestion for " .. userAddress .. " sent directly.")
  end
end

-- Returns daily check-ins directly via message reply
function replyWithCheckIns(msg, userAddress)
  local userCheckIns = State.DailyCheckIns[userAddress] or {}
  ao.send({
    Target = msg.From,
    Action = "CheckInData",
    Data = json.encode(userCheckIns)
  })
  print("Daily check-ins for " .. userAddress .. " sent directly.")
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

    replyWithProfile(msg, userAddress)
    persistState()

    print("User profile created/updated for: " .. userAddress)
  end
)

-- Handler for the frontend to request a user's profile
-- Auto-creates a default profile if none exists
Handlers.add(
  "GetProfile",
  Handlers.utils.hasMatchingTag("Action", "GetProfile"),
  function (msg)
    local userAddress = msg.From
    local userProfile = State.UserProfiles[userAddress]

    -- Auto-create default profile if none exists
    if not userProfile then
      print("Creating default profile for new user: " .. userAddress)
      State.UserProfiles[userAddress] = {
        wallet_address = userAddress,
        age = 0,  -- Default to 0 to indicate not set
        gender = "Not specified",
        fitness_level = "Beginner",
        fitness_goal = "general-health",
        height = 0,  -- Default to 0 to indicate not set
        weight = 0,  -- Added missing weight field
        registration_date = msg.Timestamp or os.time() * 1000
      }
      userProfile = State.UserProfiles[userAddress]
      persistState()
      
      -- Send success response
      ao.send({
        Target = msg.From,
        Action = "ProfileCreated",
        Data = json.encode(userProfile)
      })
    end

    replyWithProfile(msg, userAddress)
    print("Profile retrieved/created for: " .. userAddress)
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
      duration_minutes = tonumber(msg.Tags.Duration), -- Aligned with frontend interface
      date = msg.Timestamp
    })
    
    replyWithWorkouts(msg, userAddress)
    persistState()
    
    print("Workout logged for: " .. userAddress)
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
      food_item = msg.Tags.Food, -- Aligned with frontend interface
      calories = tonumber(msg.Tags.Calories),
      date = msg.Timestamp
    })

    replyWithNutrition(msg, userAddress)
    persistState()

    print("Nutrition logged for: " .. userAddress)
  end
)

-- Handler for AI-powered workout suggestions
Handlers.add(
  "RequestWorkout",
  Handlers.utils.hasMatchingTag("Action", "RequestWorkout"),
  function(msg)
    local userAddress = msg.From
    
    -- Generate intelligent workout based on user context
    local smartWorkout = generateProgressiveWorkout(userAddress)
    
    -- Add AI insights to the workout
    local context = calculateUserContext(userAddress)
    local aiInsights = {
      reason = "Based on your recent activity and wellness data",
      mood_factor = context.mood <= 3 and "mood-boost focus" or "optimal performance",
      sleep_factor = context.sleep < 6 and "recovery emphasis" or "full intensity",
      progression = context.workout_count > 10 and "progressive difficulty" or "foundation building"
    }
    
    -- Enhanced workout with AI context
    local enhancedWorkout = {
      exercises = smartWorkout,
      ai_insights = aiInsights,
      personalization_score = math.floor((context.mood + context.sleep/2 + context.energy/2) * 10) / 10,
      recommended_time = os.date("%H:%M"),
      difficulty_level = context.workout_count > 20 and "Advanced" or (context.workout_count > 10 and "Intermediate" or "Beginner")
    }

    replyWithSuggestion(msg, userAddress, enhancedWorkout)

    print("🤖 AI Workout generated for " .. userAddress .. " (Score: " .. enhancedWorkout.personalization_score .. ")")
  end
)

-- Handler for the frontend to request a user's workouts
Handlers.add(
  "GetWorkouts",
  Handlers.utils.hasMatchingTag("Action", "GetWorkouts"),
  function (msg)
    replyWithWorkouts(msg, msg.From)
  end
)

-- Handler for the frontend to request a user's nutrition logs
Handlers.add(
  "GetNutritionLogs",
  Handlers.utils.hasMatchingTag("Action", "GetNutritionLogs"),
  function (msg)
    replyWithNutrition(msg, msg.From)
  end
)

-- Handler for Logging a Daily Check-in
Handlers.add(
  "LogDailyCheckIn",
  Handlers.utils.hasMatchingTag("Action", "LogDailyCheckIn"),
  function (msg)
    local userAddress = msg.From
    if not State.DailyCheckIns[userAddress] then State.DailyCheckIns[userAddress] = {} end

    -- Use date as key to prevent duplicate entries for the same day
    local today = os.date("!%Y-%m-%d")
    State.DailyCheckIns[userAddress][today] = {
      mood = tonumber(msg.Tags.Mood) or 3, -- Default to neutral mood
      sleep_hours = tonumber(msg.Tags.SleepHours) or 0,
      activity_minutes = tonumber(msg.Tags.ActivityMinutes) or 0,
      notes = msg.Tags.Notes or "",
      date = msg.Timestamp
    }

    replyWithCheckIns(msg, userAddress)
    persistState()

    print("Daily Check-in logged for: " .. userAddress)
  end
)

-- Handler for the frontend to request a user's daily check-ins
-- Handler to generate a reminder for the daily check-in
Handlers.add(
  "CheckInReminder",
  Handlers.utils.hasMatchingTag("Action", "CheckInReminder"),
  function (msg)
    local userAddress = msg.Owner
    local today = os.date("!%Y-%m-%d", msg.Timestamp / 1000)

    if State.Users[userAddress] then
      local hasCheckedInToday = false
      if State.DailyCheckIns[userAddress] then
        for _, checkIn in ipairs(State.DailyCheckIns[userAddress]) do
          if os.date("!%Y-%m-%d", checkIn.date / 1000) == today then
            hasCheckedInToday = true
            break
          end
        end
      end

      if not hasCheckedInToday then
        if not State.Notifications[userAddress] then
          State.Notifications[userAddress] = {}
        end
        table.insert(State.Notifications[userAddress], {
          id = tostring(#State.Notifications[userAddress] + 1),
          message = "Don't forget to log your daily check-in!",
          timestamp = msg.Timestamp,
          read = false
        })
        ao.send({ Target = msg.From, Action = "ReminderSent" })
      end
    end
  end
)

-- Handler to get notifications for a user
Handlers.add(
  "GetNotifications",
  Handlers.utils.hasMatchingTag("Action", "GetNotifications"),
  function (msg)
    local userAddress = msg.Owner
    local userNotifications = State.Notifications[userAddress] or {}
    
    ao.send({
      Target = msg.From,
      Action = "Notifications",
      Data = json.encode(userNotifications)
    })
  end
)

-- Handler to mark notifications as read
Handlers.add(
  "MarkNotificationsRead",
  Handlers.utils.hasMatchingTag("Action", "MarkNotificationsRead"),
  function (msg)
    local userAddress = msg.Owner
    if State.Notifications[userAddress] then
      for _, notif in ipairs(State.Notifications[userAddress]) do
        notif.read = true
      end
      persistState(msg)
    end
  end
)

Handlers.add(
  "GetDailyCheckIns",
  Handlers.utils.hasMatchingTag("Action", "GetDailyCheckIns"),
  function (msg)
    replyWithCheckIns(msg, msg.From)
  end
)

-- Autonomous 72+ Hour Operation System
-- Self-triggering message loops for continuous operation

-- Initialize autonomous operation
function initializeAutonomousMode()
  print("🤖 Initializing 72+ hour autonomous operation...")
  
  -- Schedule first autonomous cycle
  ao.send({
    Target = ao.id,
    Action = "AutonomousCycle",
    Tags = {
      { name = "CycleType", value = "DailyAnalysis" },
      { name = "Timestamp", value = tostring(os.time()) }
    }
  })
  
  print("✅ Autonomous mode activated - agent will run continuously")
end

-- Daily autonomous analysis and insights
Handlers.add(
  "AutonomousCycle",
  Handlers.utils.hasMatchingTag("Action", "AutonomousCycle"),
  function(msg)
    print("🔄 Running autonomous cycle at " .. os.date("!%Y-%m-%d %H:%M:%S"))
    
    -- Analyze all users' data and generate insights
    for userAddress, profile in pairs(State.UserProfiles) do
      generateDailyInsights(userAddress)
      checkHealthTrends(userAddress)
      sendProactiveRecommendations(userAddress)
    end
    
    -- Schedule next cycle in 24 hours (86400 seconds)
    ao.send({
      Target = ao.id,
      Action = "AutonomousCycle",
      Tags = {
        { name = "CycleType", value = "DailyAnalysis" },
        { name = "Timestamp", value = tostring(os.time() + 86400) }
      }
    })
    
    print("📊 Daily analysis complete, next cycle scheduled")
  end
)

-- Generate personalized daily insights
function generateDailyInsights(userAddress)
  local workouts = State.Workouts[userAddress] or {}
  local nutrition = State.NutritionLogs[userAddress] or {}
  local checkIns = State.DailyCheckIns[userAddress] or {}
  
  if #workouts == 0 then return end
  
  -- Calculate weekly workout frequency
  local weekAgo = os.time() - (7 * 24 * 60 * 60)
  local recentWorkouts = 0
  for _, workout in ipairs(workouts) do
    if workout.date > weekAgo then
      recentWorkouts = recentWorkouts + 1
    end
  end
  
  -- Generate insight message
  local insight = ""
  if recentWorkouts >= 4 then
    insight = "🔥 Amazing! You've worked out " .. recentWorkouts .. " times this week. You're crushing your fitness goals!"
  elseif recentWorkouts >= 2 then
    insight = "💪 Good progress with " .. recentWorkouts .. " workouts this week. Try to add one more session!"
  else
    insight = "⏰ Only " .. recentWorkouts .. " workout this week. Your body is ready for more activity!"
  end
  
  -- Store insight as notification
  if not State.Notifications[userAddress] then
    State.Notifications[userAddress] = {}
  end
  
  table.insert(State.Notifications[userAddress], {
    id = tostring(os.time()),
    message = insight,
    timestamp = os.time(),
    read = false,
    type = "insight"
  })
  
  print("💡 Generated insight for " .. userAddress)
end

-- Monitor health trends and send alerts
function checkHealthTrends(userAddress)
  local checkIns = State.DailyCheckIns[userAddress] or {}
  
  if next(checkIns) == nil then return end
  
  -- Check mood trends over last 7 days
  local moodSum = 0
  local moodCount = 0
  local weekAgo = os.time() - (7 * 24 * 60 * 60)
  
  for date, checkIn in pairs(checkIns) do
    if checkIn.date > weekAgo then
      moodSum = moodSum + checkIn.mood
      moodCount = moodCount + 1
    end
  end
  
  if moodCount > 0 then
    local avgMood = moodSum / moodCount
    local alert = ""
    
    if avgMood < 2.5 then
      alert = "🌱 Your mood has been lower lately. Consider adding some light exercise or meditation to boost your wellbeing."
    elseif avgMood > 4 then
      alert = "🌟 Your mood has been excellent this week! Keep up whatever you're doing - it's working!"
    end
    
    if alert ~= "" then
      if not State.Notifications[userAddress] then
        State.Notifications[userAddress] = {}
      end
      
      table.insert(State.Notifications[userAddress], {
        id = tostring(os.time() + 1),
        message = alert,
        timestamp = os.time(),
        read = false,
        type = "health_alert"
      })
      
      print("🚨 Health trend alert sent to " .. userAddress)
    end
  end
end

-- Send proactive workout recommendations
function sendProactiveRecommendations(userAddress)
  local profile = State.UserProfiles[userAddress]
  local workouts = State.Workouts[userAddress] or {}
  
  if not profile then return end
  
  -- Check if user hasn't worked out in 3+ days
  local lastWorkout = 0
  for _, workout in ipairs(workouts) do
    if workout.date > lastWorkout then
      lastWorkout = workout.date
    end
  end
  
  local daysSinceWorkout = (os.time() - lastWorkout) / (24 * 60 * 60)
  
  if daysSinceWorkout >= 3 then
    local recommendation = ""
    if profile.fitness_level == "beginner" then
      recommendation = "🚶‍♀️ It's been a few days since your last workout. How about a gentle 20-minute walk today?"
    elseif profile.fitness_level == "intermediate" then
      recommendation = "🏃‍♂️ Ready to get back into it? A quick 30-minute cardio session would be perfect!"
    else
      recommendation = "💪 Time to challenge yourself! Your body is ready for an intense training session."
    end
    
    if not State.Notifications[userAddress] then
      State.Notifications[userAddress] = {}
    end
    
    table.insert(State.Notifications[userAddress], {
      id = tostring(os.time() + 2),
      message = recommendation,
      timestamp = os.time(),
      read = false,
      type = "workout_reminder"
    })
    
    print("🏋️ Proactive recommendation sent to " .. userAddress)
  end
end

-- Start autonomous operation when agent loads
initializeAutonomousMode()

print("Unified Wellness Agent is loaded and ready for 72+ hour autonomous operation.")