import express from "express";
import { updateUserProfileData, updateUserPassword, updateUserProfilePicture } from "../controllers/userProfile.js"
import { verifyToken } from '../middlewares/auth.js'
import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "C:/Github/erp-secretary/frontend/public/uploads");
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
})

const uploads = multer({ storage: storage })

const router = express.Router();


router.post("/updateUserProfileData", verifyToken, updateUserProfileData);
router.patch("/updateUserProfilePicture", verifyToken, uploads.single('profilePicture'), updateUserProfilePicture);
router.post("/updateUserPassword", verifyToken, updateUserPassword);


export default router;