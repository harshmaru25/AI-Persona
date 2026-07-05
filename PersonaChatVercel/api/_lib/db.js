import mongoose from "mongoose";

// Serverless functions can be invoked many times against the same warm
// container, so we cache the connection on `global` to avoid exhausting
// MongoDB Atlas's connection limit by reconnecting on every request.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined in environment variables");

    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
