import express from 'express';
import mongoose from 'mongoose';
import { io } from '../../server.js';

import Meeting from '../../models/meeting.js';
import User from '../../models/user.js';
import Notification from '../../models/notification.js';
import moment from "moment";
import "moment/locale/fr.js";
import nodemailer from "nodemailer";
import outlook from "nodejs-nodemailer-outlook";

const router = express.Router();

export const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find();

        res.status(200).json(meetings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMeetingById = async (req, res) => {
    const { id } = req.params;

    try {
        const meeting = await Meeting.findById(id).populate('invitedMembers');

        res.status(200).json(meeting);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMeeting = async (req, res) => {
    const meeting = req.body;

    const newMeeting = new Meeting({ ...meeting, createdAt: new Date().toISOString() })

    try {
        await newMeeting.save();

        const notification = await Notification.create({
            meetingId: newMeeting,
            category: "meeting",
            action: "new",
            title: newMeeting.name,
            message:
                "Vous avez une réunion : " +
                newMeeting.name +
                " le " +
                moment(newMeeting.planDate).format('DD/MM/YYYY') +
                " de " +
                newMeeting.startTime +
                " à " +
                newMeeting.endTime +
                ", via ce lien: ",
            name: newMeeting.name,
            planDate: newMeeting.planDate,
            startTime: newMeeting.startTime,
            endTime: newMeeting.endTime,
            hostLink: newMeeting.hostLink,
            participantLink: newMeeting.participantLink,
            read: false,
        });

        const members = await User.find({ _id: { $in: newMeeting.invitedMembers } })

        for (let i = 0; i < members.length; i++) {
            console.log(members[i].name)
            members[i].notification.push(notification);
            await members[i].save();
        }

        for (let i = 0; i < members.length; i++) {
            if (members[i].socketId) {
                io.to(members[i].socketId).emit("change_data");
            }
        }



        setTimeout(function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }

            members.forEach(function (to, i, array) {

                var mailOptions = {
                    auth: {
                        user: "inceptumje@hotmail.com",
                        pass: "inceptumERP2021",
                    },
                    from: "INCEPTUM Junior Entreprise <inceptumje@hotmail.com>",
                    to: members[i].email,
                    subject: newMeeting.name,
                    text:
                        "Salut, Cher Membre. \n" +
                        "Vous avez une réunion : " +
                        newMeeting.name +
                        " le " +
                        moment(newMeeting.planDate).format('DD/MM/YYYY') +
                        " de " +
                        newMeeting.startTime +
                        " à " +
                        newMeeting.endTime +
                        ", via ce lien: " +
                        newMeeting.participantLink,
                //     html: `
                //     <p>You have a new contact request</p>
                //     <h3>Contact Details</h3>
                //     <h3>Message</h3>
                //   `,
                    onError: (e) => console.log(e),
                    onSuccess: (i) => console.log(i)
                };

                // mailOptions.to = to;
                outlook.sendEmail(mailOptions);

            });


        }, 2500)








        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: 'fourat.abdellatif@esprit.tn',
        //         pass: '211JMT1878'
        //     },
        // });

        // setTimeout(function (err) {
        //     if (err) {
        //         return res.status(500).send({ msg: err.message });
        //     }

        //     members.forEach(async function (to, i, array) {

        //         var mailOptions = {
        //             from: "INCEPTUM Junior Entreprise <fourat.abdellatif@esprit.tn>",
        //             to: members[i].email,
        //             subject: newMeeting.name,
        //             text:
        //                 "Salut, Cher Membre. \n" +
        //                 "Vous avez une réunion : " +
        //                 newMeeting.name +
        //                 " le " +
        //                 moment(newMeeting.planDate).format('DD/MM/YYYY') +
        //                 " de " +
        //                 newMeeting.startTime +
        //                 " à " +
        //                 newMeeting.endTime +
        //                 ", via ce lien: " +
        //                 newMeeting.participantLink,
        //             onError: (e) => console.log(e),
        //             onSuccess: (i) => console.log(i)
        //         };

        //         try {
        //             await transporter.sendMail(mailOptions, function (error, response) {
        //                 if (error) {
        //                     console.log(error);
        //                 } else {
        //                     res.redirect('/');
        //                 }
        //             });
        //         } catch (error) {
        //             console.log(error);
        //         }

        //     });


        // }, 5000);







        // await setTimeout(function (err) {
        //     if (err) {
        //         return res.status(500).send({ msg: err.message });
        //     }

        //     // Send email (use credintials of Outlook)
        //     let transporter = nodemailer.createTransport({
        //         service: 'gmail',
        //         auth: {
        //             type: 'OAuth2',
        //             user: 'fourat.abdellatif@esprit.tn',
        //             pass: '211JMT1878',
        //             clientId: '970537065848-6i5uvtitli0dkvbdp1ph5js5lqcgailb.apps.googleusercontent.com',
        //             clientSecret: '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',
        //             refreshToken: '1//04Hc571pU2zZeCgYIARAAGAQSNwF-L9IrfhS2c9kCm_Z7PyNZWTDvQvuWjah_x48OCI4pEgWeGXPuKSHsFdLhsqMheqIZVW5yruE'
        //         }
        //     });

        //     var invitedMembers = [
        //         'fourat-abdellatif99@hotmail.fr',
        //         'fourat.abdellatif@esprit.tn',
        //         'fourat.abdellatifo99@gmail.com',
        //     ]

        //     invitedMembers.forEach(function (to, i, array) {

        //         var mailOptions = {
        //             from: "INCEPTUM Junior Entreprise <fourat.abdellatif@esprit.tn>",
        //             subject: newMeeting.name,
        //             text:
        //                 "Salut, Cher Membre. \n" +
        //                 "Vous avez une réunion : " +
        //                 newMeeting.name +
        //                 " le " +
        //                 newMeeting.planDate +
        //                 " de " +
        //                 newMeeting.startTime +
        //                 " à " +
        //                 newMeeting.endTime +
        //                 ", via ce lien: " +
        //                 newMeeting.participantLink,
        //         };

        //         mailOptions.to = to;


        //         transporter.sendMail(mailOptions, function (err) {
        //             if (err) {
        //                 return res.status(500).send({
        //                     msg:
        //                         "Problème technique! Veuillez cliquer sur renvoyer pour vérifier votre e-mail.",
        //                 });
        //             }
        //             return res
        //                 .status(200)
        //                 .send(
        //                     "Un email de vérification a été envoyé à " +
        //                     result.email +
        //                     ". Il expirera après un jour. Si vous n'avez pas reçu d'e-mail de vérification, cliquez sur le lien de renvoi."
        //                 );

        //         });
        //     });

        // }, 5000)

        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMeeting = async (req, res) => {
    const { id } = req.params;
    const { name, planDate, startTime, endTime, hostLink, participantLink } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No meeting with id: ${id}`);

    const updatedMeeting = { name, planDate, startTime, endTime, hostLink, participantLink, _id: id };

    await Meeting.findByIdAndUpdate(id, updatedMeeting, { new: true });

    const notification = await Notification.create({
        meetingId: updatedMeeting,
        category: "meeting",
        action: "update",
        title: "[Rectification: " + updatedMeeting.name + "]",
        message:
            "Votre réunion : " +
            updatedMeeting.name +
            " a été reportée à cette date: " +
            moment(updatedMeeting.planDate).format('DD/MM/YYYY') +
            " de " +
            updatedMeeting.startTime +
            " à " +
            updatedMeeting.endTime +
            ", via ce lien: ",
        name: updatedMeeting.name,
        planDate: updatedMeeting.planDate,
        startTime: updatedMeeting.startTime,
        endTime: updatedMeeting.endTime,
        hostLink: updatedMeeting.hostLink,
        participantLink: updatedMeeting.participantLink,
        read: false,
    });

    const members = await User.find();
    for (let i = 0; i < members.length; i++) {
        members[i].notification.push(notification);
        await members[i].save();
    }

    for (let i = 0; i < members.length; i++) {
        if (members[i].socketId) {
            io.to(members[i].socketId).emit("change_data");
        }
    }

    res.json(updatedMeeting);
}

export const deleteMeeting = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No meeting with id: ${id}`);

    const deletedMeeting = await Meeting.findById(id);

    const notification = await Notification.create({
        meetingId: deletedMeeting,
        category: "meeting",
        action: "cancel",
        title: "[Réunion annulée: " + deletedMeeting.name + "]",
        message:
            "Votre réunion : " +
            deletedMeeting.name +
            " a été annulée. On vous informera s'il y a quelque chose de nouveau à propos de cette réunion",
        read: false,
    });

    const members = await User.find();
    for (let i = 0; i < members.length; i++) {
        members[i].notification.push(notification);
        await members[i].save();
    }

    for (let i = 0; i < members.length; i++) {
        if (members[i].socketId) {
            io.to(members[i].socketId).emit("change_data");
        }
    }

    await Meeting.findByIdAndRemove(id);

    res.json({ message: "Meeting deleted successfully." });
}

export default router;