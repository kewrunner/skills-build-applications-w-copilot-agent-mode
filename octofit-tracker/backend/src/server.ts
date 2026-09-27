import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase, getApiBaseUrl } from './config/database.ts';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    goal: { type: String, default: 'Stay active' },
    team: { type: String, default: 'Unassigned' },
  },
  { versionKey: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
  },
  { versionKey: false }
);

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: String, required: true },
  },
  { versionKey: false }
);

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    badge: { type: String, default: 'Rising' },
  },
  { versionKey: false }
);

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
    intensity: { type: String, default: 'Moderate' },
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema, 'teams');
const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema, 'activities');
const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema, 'workouts');

const sendJsonArray = async (model: mongoose.Model<any>, res: express.Response) => {
  const data = await model.find({}).lean();
  res.json(data);
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: 'octofit_db', baseUrl: getApiBaseUrl() });
});

app.get('/api/users/', async (_req, res) => {
  await sendJsonArray(User, res);
});

app.get('/api/teams/', async (_req, res) => {
  await sendJsonArray(Team, res);
});

app.get('/api/activities/', async (_req, res) => {
  await sendJsonArray(Activity, res);
});

app.get('/api/leaderboard/', async (_req, res) => {
  await sendJsonArray(LeaderboardEntry, res);
});

app.get('/api/workouts/', async (_req, res) => {
  await sendJsonArray(Workout, res);
});

const startServer = async () => {
  await connectDatabase();
  app.listen(8000, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API running on ${getApiBaseUrl()}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});
