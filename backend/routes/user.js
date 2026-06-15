const express = require('express');
const router = express.Router();
const { requireAuth, getAuth } = require('@clerk/express');
const User = require('../models/user');
const Attendance = require('../models/attendance');

router.get('/profile', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            user = await User.create({ clerkId: userId });
        }

        res.json({ user });
    } catch (err) {
        console.error('GET /profile error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/profile', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { course, selectedSubjects, name, email } = req.body;

        const update = {};
        if (course !== undefined) update.course = course;
        if (selectedSubjects !== undefined) update.selectedSubjects = selectedSubjects;
        if (name !== undefined) update.name = name;
        if (email !== undefined) update.email = email;

        let user = await User.findOneAndUpdate(
            { clerkId: userId },
            { $set: update },
            { new: true, upsert: true }
        );

        if (selectedSubjects && Array.isArray(selectedSubjects)) {
            for (const subject of selectedSubjects) {
                await Attendance.findOneAndUpdate(
                    { userId, subject },
                    { $setOnInsert: { attended: 0, total: 0, required: 75 } },
                    { upsert: true }
                );
            }
        }

        res.json({ user });
    } catch (err) {
        console.error('PATCH /profile error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
