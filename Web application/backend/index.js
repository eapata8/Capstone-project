const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Import Routes
const authRoutes = require('./src/users/user.route');
app.use('/api/auth', authRoutes);

// MongoDB Connection + Start Server
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ MongoDB is successfully connected");

        // Define base route after DB connection is established
        app.get("/", (req, res) => {
            res.send("Capstone Project site is running....!");
        });

        // Start the server only after the DB is connected
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}

// Call the function to start everything
main();
