import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.js";


export const updateUserProfilePicture = async (req, res) => {
    const id = req.userId;
    const profilePicture = req.file;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No User with id: ${id}`);
        const updatedUserProfilePicture = await User.findByIdAndUpdate(id, { profilePicture: profilePicture.filename }, { new: true });

        return res.status(200).json(updatedUserProfilePicture);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUserProfileData = async (req, res) => {
    const id = req.userId;
    const { firstName, lastName, phone, city, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No User with id: ${id}`);

    const updatedUserProfileData = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        phone,
        city,
        address,
        _id: id,
    };

    await User.findByIdAndUpdate(id, updatedUserProfileData, { new: true });

    res.json(updatedUserProfileData);
};

export const updateUserPassword = async (req, res) => {
    const id = req.userId;
    const { password, newPassword, confirmNewPassword } = req.body;

    console.log(password, newPassword, confirmNewPassword)

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No User with id: ${id}`);

    const user = await User.findOne({ _id: id });

    const isPasswordPCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordPCorrect) {
        return res.status(500).json({ message: "Current password is incorrect" });
    }

    if (newPassword != confirmNewPassword) {
        return res.status(500).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUserPassword = {
        password: hashedPassword,
        _id: id,
    };

    await User.findByIdAndUpdate(id, updatedUserPassword, { new: true });

    return res.status(200).json(updatedUserPassword);
};