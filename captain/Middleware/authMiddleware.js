import jwt from "jsonwebtoken";
import Captain from "../model/captain.model.js";
import BlackList from "../model/blacklisttoken.model.js";


export const captainAuth = async (req, res, next) => {
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await BlackList.findOne({ token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await Captain.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.captain = user;
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
