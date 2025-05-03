import jwt from "jsonwebtoken";
import axios from "axios";

export const userAuth = async (req, res, next) => {
    // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1] ||
    req.body.token;
    console.log("Token from request:", token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        console.log(process.env.BASE_URL);
        
        const response=await axios.get(`${process.env.BASE_URL}/user/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })     
        console.log(response.data);

        const user = response.data.user;
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

