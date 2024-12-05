const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const customerRoutes = require("./routes/customerRoutes.js");
const utilsRoutes = require('./routes/utilsRoutes.js')
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.dbURI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/customer", customerRoutes);
app.use("/utils", utilsRoutes);
app.use(express.static("./client/dist"));

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const connectWithRetry = async (retries = 5, delay = 2000) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}\nStack trace:\n${err.stack}`);
    if (retries > 0) {
      console.warn(`Retrying connection in ${delay / 1000} seconds... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectWithRetry(retries - 1, delay * 2); // Exponential backoff
    } else {
      console.error("Failed to connect to MongoDB after multiple attempts.");
      process.exit(1); // Exit the process with an error code
    }
  }
};

connectWithRetry();

try {
  app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
} catch (err) {
  console.error(`Server connection error: ${err.message}\nStack trace:\n${err.stack}`);
}
