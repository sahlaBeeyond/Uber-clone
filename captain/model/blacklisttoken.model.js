import mongoose from "mongoose";
const { Schema } = mongoose;
const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour in seconds
    }
}, {
    timestamps: true
})

const BlackList = mongoose.model("BlackList", blacklistTokenSchema);
export default BlackList;