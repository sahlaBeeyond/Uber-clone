import Ride from "../model/ride.model.js";
import { publishRideEvent } from "../services/ride.services.js";


export const createRide = async (req, res) => {
    console.log("Received request to create ride:", req.body);
    try {
        console.log("Creating ride with data:", req.body);
        const { userId,pickup, destination } = req.body;
        console.log("User data:", userId,pickup,destination);
        const ride = new Ride({ 
            userId,
            pickup,
            destination
            });
        await ride.save();
        console.log("Ride saved to database:", ride);
        await publishRideEvent('ride-created', {
            rideId: ride._id,
            userId,
            pickup,
            destination
        });
        console.log("Ride created and event published:", ride);
        res.status(201).json({ message: "Ride created successfully", ride });
    } catch (error) {
        console.error("Error creating ride:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

