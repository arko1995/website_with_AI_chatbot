import mongoose from 'mongoose';

let attempted = false;
let connected = false;

export async function connectDatabase() {
  if (attempted) return connected;
  attempted = true;
  if (!process.env.MONGODB_URI) {
    console.log('[db] MONGODB_URI is empty; using JSON fallback for content.');
    return false;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    connected = true;
    console.log('[db] MongoDB connected.');
  } catch (error) {
    console.warn(`[db] MongoDB unavailable (${error.message}); using JSON fallback.`);
  }
  return connected;
}

export function databaseConnected() {
  return connected && mongoose.connection.readyState === 1;
}
