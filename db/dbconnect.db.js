import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.URL;

mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error("Connection error:", error.message);
});

db.once('open', () => {
    console.log("Database connection is open");
});
