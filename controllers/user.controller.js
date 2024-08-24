import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userDelete = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: error.message
        });
    }
};

const userUpdate = async (req, res) => {
    const { fname, lname, gender, phonenumber, email, password,role } = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { fname, lname, gender, phonenumber, email, password,role },
            { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "Updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const userRegister = async (req, res) => {
    const { fname, lname, gender, phonenumber, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({ fname, lname, gender, phonenumber, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Set cookie upon registration
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true }).json({ token, role: user.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true }).json({ token, role: user.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export default {
    userRegister,
    login,
    userUpdate,
    userDelete,
    allUsers
};
