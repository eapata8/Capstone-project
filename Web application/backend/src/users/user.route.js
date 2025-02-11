const express = require('express');
const bcrypt = require('bcrypt');  
const User = require('./user.model');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, username, password: hashedPassword });

        await user.save();
        res.status(201).send({ message: "User registered successfully!" });

    } catch (error) {
        console.error("❌ Error registering user:", error.message);
        res.status(500).send({ message: "Error registering user" });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send({ message: "Password not match" });
    }
    res.status(200).send({ message: "Logged in successfully!" , user});
    } catch (error) {
        console.error("❌ Error logged in user:", error.message);
        res.status(500).send({ message: "Error logged in user" });
    }
});
module.exports = router;
