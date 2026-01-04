import mongoes from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");
    const conn = await mongoes.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Mongodb connected: ", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB: ", error);
    throw error;
  }
};
