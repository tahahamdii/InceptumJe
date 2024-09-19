import bcrypt from "bcryptjs"
import { ROLES } from "../../models/role.js";
import User from "../../models/user.js";
import Blacklisted from "../../models/Blacklisted.js";
import Token from "../../models/token.js";
import crypto from "crypto";
import mongoose from 'mongoose';
// import nodemailer from "nodemailer";

//ADD A NEW MEMBER
export const addMember = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        city,
        address,
        gender,
        department,
        rank,
        password,
    } = req.body;

    try {
        const existingMember = await User.findOne({
            email,
        });

        if (existingMember)
            return res.status(400).json({ message: "Le Membre existe déjà." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            phone,
            birthDate,
            city,
            address,
            gender,
            department,
            rank,
            role: ROLES[0], // maybe we can make this field controlled by RH (RH assign role to member using role select menu while creating its account)
        });

        var token = new Token({
            _userId: result._id,
            token: crypto.randomBytes(16).toString("hex"),
        });

        token.save();

        // token.save(
        //     setTimeout(function (err) {
        //         if (err) {
        //             return res.status(500).send({ msg: err.message });
        //         }

        //         let transporter = nodemailer.createTransport({
        //             host: "smtp.ethereal.email",
        //             port: 587,
        //             secure: false, // true for 465, false for other ports
        //             auth: {
        //                 user: "fourat.abdellatif@esprit.tn", // generated ethereal user
        //                 pass: "211JMT1878", // generated ethereal password
        //             },
        //         });

        //         transporter.sendMail({
        //             from: '"Inceptum Junior Entreprise" <fourat.abdellatif@esprit.tn>',
        //             to: result.email,
        //             subject: "Compte créé",
        //             text:
        //                 "Salut notre cher Membre, " +
        //                 result.name +
        //                 ",\n\n" +
        //                 "Votre compte a été créé avec succès" +
        //                 "\n\nInceptum Junior Entreprise est heureuse de vous avoir dans son équipe!\n" +
        //                 "Votre mot de passe est : " +
        //                 password,
        //             html: "<b>Hello world?</b>",
        //             onError: (e) => console.log(e),
        //             onSuccess: (i) => console.log(i)
        //         });

        //     }, 5000)
        // );

        res.status(201).json({ result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        phone,
        birthDate,
        city,
        address,
        gender,
        department,
        rank,
        password
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No member with id: ${id}`);


    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedMember = {
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        birthDate,
        address,
        city,
        gender,
        department,
        rank,
        _id: id,
    };

    await User.findByIdAndUpdate(id, updatedMember, { new: true });

    res.json(updatedMember);
};

export const deleteMember = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Member with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "Member deleted successfully." });
};

//PROMOTE MEMBER TO SG
export const promoteToSG = async (req, res) => {

    try {
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    role: ROLES[1]
                }
            }
        );
        return res.status(201).json({
            success: true,
            message: "Member promoted to SG"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failure to promote Member",
            reason: error.toString(),
            success: false
        })
    }

}

//PROMOTE MEMBER TO TRES
export const promoteToTres = async (req, res) => {

    try {
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    role: ROLES[3]
                }
            }
        );
        return res.status(201).json({
            success: true,
            message: "Member promoted to Tres"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failure to promote Member",
            reason: error.toString(),
            success: false
        })
    }

}

//PROMOTE MEMBER TO RH
export const promoteToRH = async (req, res) => {

    try {
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    role: ROLES[2]
                }
            }
        );
        return res.status(201).json({
            success: true,
            message: "Member promoted to RH"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failure to promote Member",
            reason: error.toString(),
            success: false
        })
    }

}

//DEMOTE MEMBER (MAKE THEM AN ORDINARY MEMBER AGAIN)
export const demote = async (req, res) => {

    try {
        await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    role: ROLES[0]
                }
            }
        );
        return res.status(201).json({
            success: true,
            message: "Member demoted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failure to demote",
            reason: error.toString(),
            success: false
        })
    }

}

//GET ALL MEMBERS
export const getAllMembers = async (req, res) => {
    try {
        const members = await User.find();
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            reason: error.toString(),
            success: false
        })
    }
}


//GET MEMBER BY NAME PUT IN INPUT
export const getMembersByName = async (req, res) => {
    try {
        const members = await User.find({
            name: {
                $regex: '.*' + req.params.name + '.*'
            }
        })
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            reason: error.toString(),
            success: false
        })
    }
}

//GET MEMBERS BY DEPARTMENT IN INPUT
export const getMembersByDepartment = async (req, res) => {
    try {
        const members = await User.find({
            department: req.params.dep
        })
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            reason: error.toString(),
            success: false
        })
    }
}

//ADD CANDIDAT TO BLACKLIST
export const addToBlackList = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        reason
    } = req.body;

    try {

        const entryExists = await Blacklisted.findOne({
            email,
        })
        if (entryExists) {
            return res.status(400).json({
                message: "Person already Blacklisted"
            })
        }

        await Blacklisted.create({
            email,
            firstName,
            lastName,
            reason
        });

        res.status(201).json({
            message: "Blacklisted!",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went Wrong",
            reason: error.toString(),
            success: false
        })
    }
}

