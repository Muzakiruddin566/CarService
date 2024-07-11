const asyncHandler = require('express-async-handler');
const User = require('../Model/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
    } else {
        const user = await User.create({ email, password });

        if (user) {
            return  res.status(201).send("Registration Successful")
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
});

module.exports = { authUser, registerUser };
