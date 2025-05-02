import mongoose from "mongoose";
const { Schema } = mongoose;
const captainSchema = new Schema({ 
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    isAvailable: { type: Boolean, default: false },            
}, { timestamps: true });

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;