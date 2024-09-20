import fs from "node:fs/promises";
import mongoose from "mongoose";
import csv from "csv-parser";
import { connectToMongoDB, resetDB, User } from "./db.js";

// Usage
const csvFilePath = "./users.csv";

// node version 14.8 or later are needed for top level await
const users = await readFromCSV(csvFilePath);
importUsers(users).catch(console.error);

async function readFromCSV(filePath) {
  const users = [];

  // checking if the file path is valid
  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`${filePath} is not a file`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // Opening the file
  let filehandle = await fs.open(filePath, "r");

  // Read and parse the CSV file line by line
  return new Promise((resolve, reject) => {
    const readStream = filehandle.createReadStream();
    readStream
      .pipe(csv())
      .on("data", (data) => {
        users.push(data);
      })
      .on("error", (error) => {
        console.error(error);
        reject(error);
      })
      .on("end", async () => {
        console.log("CSV file successfully parsed");
        await filehandle.close();
        resolve(users);
      });
  });
}

// Function to import users from CSV file
async function importUsers(users) {
  await connectToMongoDB();

  await resetDB();

  try {
    // Insert all users
    const result = await User.insertMany(users, { ordered: false });
    console.log(`${result.length} users imported successfully`);
  } catch (error) {
    if (error.writeErrors) {
      console.log(
        `Partially imported. ${error.insertedDocs.length} users imported successfully`
      );
      console.error(`${error.writeErrors.length} errors occurred`);
    } else {
      console.error("Error importing users:", error);
    }
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}
