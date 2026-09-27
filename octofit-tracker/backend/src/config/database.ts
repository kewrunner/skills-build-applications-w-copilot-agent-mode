import mongoose from 'mongoose';

export async function connectDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    throw error;
  }
}

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export default mongoose.connection;
