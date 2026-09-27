import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const users = [
      { name: 'Ava Patel', email: 'ava@example.com', goal: 'Train 5 days', team: 'Blue Sharks' },
      { name: 'Noah Kim', email: 'noah@example.com', goal: 'Build endurance', team: 'Red Hawks' },
      { name: 'Emma Garcia', email: 'emma@example.com', goal: 'Improve strength', team: 'Green Titans' }
    ];

    const teams = [
      { name: 'Blue Sharks', sport: 'CrossFit', members: 12, status: 'Active' },
      { name: 'Red Hawks', sport: 'Track', members: 9, status: 'Active' },
      { name: 'Green Titans', sport: 'Strength', members: 15, status: 'Active' }
    ];

    const activities = [
      { user: 'Ava Patel', type: 'Running', duration: 32, calories: 420, date: '2026-09-27' },
      { user: 'Noah Kim', type: 'Cycling', duration: 45, calories: 510, date: '2026-09-26' },
      { user: 'Emma Garcia', type: 'Weightlifting', duration: 50, calories: 610, date: '2026-09-25' }
    ];

    const leaderboard = [
      { name: 'Ava Patel', score: 980, streak: 7, badge: 'Gold' },
      { name: 'Noah Kim', score: 940, streak: 5, badge: 'Silver' },
      { name: 'Emma Garcia', score: 910, streak: 4, badge: 'Bronze' }
    ];

    const workouts = [
      { name: 'Sprint Circuit', focus: 'Cardio', duration: 30, intensity: 'High' },
      { name: 'Core Burn', focus: 'Core', duration: 20, intensity: 'Moderate' },
      { name: 'Power Lift', focus: 'Strength', duration: 45, intensity: 'High' }
    ];

    await mongoose.connection.db.dropDatabase().catch(() => undefined);
    await mongoose.connection.collection('users').insertMany(users);
    await mongoose.connection.collection('teams').insertMany(teams);
    await mongoose.connection.collection('activities').insertMany(activities);
    await mongoose.connection.collection('leaderboard').insertMany(leaderboard);
    await mongoose.connection.collection('workouts').insertMany(workouts);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
