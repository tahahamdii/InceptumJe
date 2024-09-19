import mongoose from "mongoose";
import { ROLES } from "./role.js";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  name: { type: String },
  email: { type: String },
  profilePicture: String,
  password: String,
  phone: { type: String },
  birthDate: { type: String },
  city: { type: String },
  address: { type: String },
  gender: { type: String },
  department: { type: String },
  rank: { type: String },
  role: [
    {
      type: String,
      required: true,
      enum: ROLES,
    },
  ],
  socketId: { type: String },
  notification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

export default mongoose.model("User", userSchema);
