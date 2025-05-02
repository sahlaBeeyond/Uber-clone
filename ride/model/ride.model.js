import mongoose from "mongoose";
const { Schema } = mongoose;
const rideSchema = new Schema({ 
    captainId: { type: Schema.Types.ObjectId }, 
    userId: { type: Schema.Types.ObjectId,required: true },
    pickup: { type: String, required: true }, 
    destination: { type: String, required: true },
    status: { type: String, enum: ["requested", "accepted","started", "completed"], default: "requested" },        
}, { timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;