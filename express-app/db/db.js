import mongoose from "mongoose";
import { validateEmail } from "../utils/helper.js";

// Reuse the User model from the previous example
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  age: {
    type: Number,
    min: 0,
  },
});

export const User = mongoose.model("User", userSchema);

export async function connectToMongoDB() {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

export async function resetDB() {
  // Flush the data from the collection
  try {
    await User.deleteMany({});
    console.log("Database reset");
  } catch (error) {
    console.error(error);
  }
}
