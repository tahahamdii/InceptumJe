import mongoose from "mongoose";

const blacklistedSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    reason : String
})



export default mongoose.model("Blacklisted", blacklistedSchema);