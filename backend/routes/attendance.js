const express = require('express');
const router = express.Router();
const { requireAuth, getAuth } = require('@clerk/express');
const Attendance = require('../models/attendance');

router.get('/', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const attendance = await Attendance.find({ userId }).sort({ subject: 1 }).lean();
        res.json({ attendance });
    } catch (err) {
        console.error('GET /attendance error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/mark', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { subject, status } = req.body;

        if (!subject || !status) {
            return res.status(400).json({ error: 'subject and status are required' });
        }

        const update = { $inc: { total: 1 } };
        if (status === 'present') update.$inc.attended = 1;
        update.$set = { updatedAt: new Date() };

        const attendance = await Attendance.findOneAndUpdate(
            { userId, subject },
            update,
            { new: true, upsert: true }
        );

        res.json({ attendance });
    } catch (err) {
        console.error('POST /attendance/mark error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
