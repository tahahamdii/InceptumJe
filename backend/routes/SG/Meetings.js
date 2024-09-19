import express from 'express';
import { createMeeting, deleteMeeting, getMeetingById, getMeetings, updateMeeting } from '../../controllers/SG/Meetings.js';
// import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get(
    '/',
    // verifyToken,
    getMeetings
);
router.get(
    '/:id',
    // verifyToken,
    getMeetingById
);
router.post(
    '/createMeeting',
    // verifyToken,
    createMeeting
);
router.patch(
    '/updateMeeting/:id',
    // verifyToken,
    updateMeeting
);
router.delete(
    '/deleteMeeting/:id',
    // verifyToken,
    deleteMeeting
);

export default router;