import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import BlackList from "../model/blacklisttoken.model.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.find({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });                    
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token);
        res.send({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }       
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        } 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token);
        res.send({ message: "User logged in successfully" });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await BlackList.create({ token });
        res.clearCookie("token");
        res.send({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUser = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}









