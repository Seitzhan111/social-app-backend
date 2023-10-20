import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
}, {
    timestamps: true
})

export default mongoose.model('request', requestSchema)