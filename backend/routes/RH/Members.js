import express from "express";
import { addMember, demote, promoteToRH, promoteToSG, promoteToTres, getAllMembers, updateMember, deleteMember } from "../../controllers/RH/Members.js";

const router = express.Router();

router.post("/addMember", addMember);
router.patch("/updateMember/:id", updateMember);
router.delete("/deleteMember/:id", deleteMember);
router.put("/promoteToSG/:id", promoteToSG);
router.put("/promoteToTres/:id", promoteToTres);
router.put("/promoteToRH/:id", promoteToRH);
router.put("/demote/:id", demote);
router.get("/getAllMembers", getAllMembers);



export default router;