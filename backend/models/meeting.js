import mongoose from 'mongoose';

const meetingSchema = mongoose.Schema({
    name: String,
    planDate: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    hostLink: String,
    participantLink: String,
    invitedMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: ''
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var meeting = mongoose.model('meeting', meetingSchema);

export default meeting;