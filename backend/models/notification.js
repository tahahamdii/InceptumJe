import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    meetingId: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting" },
    category: { type: String },
    action: { type: String },
    title: { type: String },
    message: { type: String },
    read: { type: Boolean, default: false },
    hostLink: { type: String },
    participantLink: { type: String },
    name: String,
    planDate: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model("Notification", notificationSchema);