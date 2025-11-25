const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

 const router = express.Router();

 // Sign Up Route
 router.post('/signup', async (request, response) => {
    try {
        const { email, password, role } = request.body;

        const user = new User({ email, password, role });
        await user.save();
        response.status(202).json({})
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
 });

 // Login Route
 router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user)  return response.status(400).json({
            error: 'Invalid password'
        });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return response.sytatus(400).json({
            error: 'Invalid password'
        });

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );
        response.json({ token });
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
 });

module.exports = router;