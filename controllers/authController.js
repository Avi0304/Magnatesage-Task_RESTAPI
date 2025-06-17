const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

const registerController = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password is required" })
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User is Already Exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User is register Successfully...' });
    } catch (error) {
        console.error("Register Error: ", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password is required" })
        }

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
           return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return res.status(200).json({ message: "Login Successfully...", token })
    } catch (error) {
        console.error("Login Error", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const forgetPassword = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username })
        if (!username) {
            return res.status(404).json({ message: "user not found." });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpires = Date.now() + 3600000;
        await user.save();

        res.status(200).json({message: "Reset token generated,. Use it to reset Password.", resetToken: token});
    } catch (error) {
        console.error("Forget password error: ", error);
        res.status(500).json({message: "INternal Server error", error: error.message})
    }

}

const resetPassword = async(req, res) => {
    const {token} = req.query;
    const {newPassword} = req.body;

    try {
        const user = await User.findOne({resetToken: token, resetTokenExpires: {$gt: Date.now()}});

        if(!user){
            return res.status(400).json({message: "Invalid or expire token."});
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined,
        user.resetTokenExpires = undefined,
        await user.save();
        
        res.status(200).json({message: "Password Reset successfully."})
    } catch (error) {
         console.error("Reset password error: ", error);
        res.status(500).json({message: "Internal Server error", error: error.message})
    }
}


module.exports = { registerController, loginController, forgetPassword, resetPassword }