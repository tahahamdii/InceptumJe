import express from "express";
import { signIn } from "../controllers/authJwt.js";

const router = express.Router();

router.post("/signIn", signIn);


// router.post("/signInMember", signInMember);
// router.post("/signInSG", signInSG);

export default router;
