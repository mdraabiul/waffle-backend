// Import mongoose
import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI);

// Listen to the connection event
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Listen to the error event
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Listen to the disconnection event
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Close the connection when the Node process exits
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection disconnected through app termination");
    process.exit(0);
  });
});

export default mongoose;
