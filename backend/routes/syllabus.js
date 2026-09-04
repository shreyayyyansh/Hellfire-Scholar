const express = require('express');
const router = express.Router();
const { requireAuth, getAuth } = require('@clerk/express');
const SyllabusProgress = require('../models/syllabusProgress');

router.get('/:subject', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const subject = decodeURIComponent(req.params.subject);

        const record = await SyllabusProgress.findOne({ userId, subject });
        res.json({ completedTopics: record ? record.completedTopics : [] });
    } catch (err) {
        console.error('GET /syllabus error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/:subject/toggle', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const subject = decodeURIComponent(req.params.subject);
        const { topic } = req.body;

        if (!topic) return res.status(400).json({ error: 'topic is required' });

        let record = await SyllabusProgress.findOne({ userId, subject });

        if (!record) {
            record = await SyllabusProgress.create({
                userId,
                subject,
                completedTopics: [topic],
            });
        } else {
            const idx = record.completedTopics.indexOf(topic);
            if (idx > -1) {
                record.completedTopics.splice(idx, 1);
            } else {
                record.completedTopics.push(topic);
            }
            record.updatedAt = new Date();
            await record.save();
        }

        res.json({ completedTopics: record.completedTopics });
    } catch (err) {
        console.error('PATCH /syllabus/toggle error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
