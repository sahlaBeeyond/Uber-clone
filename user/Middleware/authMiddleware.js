import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const userAuth = async (req, res, next) => {
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
