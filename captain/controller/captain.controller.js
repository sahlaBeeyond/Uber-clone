import Captain from "../model/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import BlackList from "../model/blacklisttoken.model.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingCaptain = await Captain.findOne({ email });
        
        if (existingCaptain) {
            return res.status(400).json({ message: "Captain already exists" });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newCaptain = new Captain({ name, email, password: hashedPassword });          // Save the new Captain to the database
                          
        await newCaptain.save();
        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token);
        delete newCaptain._doc.password; // Remove password from Captain object before sending response
        res.status(201).json({
            token,
            captain: newCaptain,
            message: "Captain registered successfully"
          });

    } catch (error) {
        console.error("Error registering Captain:", error);
        res.status(500).json({ message: "Internal server error" });
    }       
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const captain = await Captain.findOne({ email });
        if (!captain) {     
            return res.status(400).json({ message: "Invalid credentials" });
        } 
        const isPasswordValid = await bcrypt.compare(password, captain.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token);
        delete captain._doc.password; // Remove password from Captain object before sending response
        res.status(201).json({
            token,
            captain          
        });
    }
    catch (error) {
        console.error("Error logging in Captain:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await BlackList.create({ token });
        res.clearCookie("token");
        res.send({ message: "Captain logged out successfully" });
    } catch (error) {
        console.error("Error logging out Captain:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCaptain = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        console.error("Error getting Captain:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const isAvailable = async (req, res) => {
    try {
        const captain = await Captain.findById(req.captain._id); // Find the Captain by ID from the request
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }   
        captain.isAvailable = !captain.isAvailable; // Toggle availability
        await captain.save(); // Save the updated Captain object to the database
        res.status(200).json({ message: "Availability updated successfully", Captain : captain });
    } catch (error) {
        console.error("Error updating availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}









