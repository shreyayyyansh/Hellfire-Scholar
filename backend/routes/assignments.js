const express = require('express');
const router = express.Router();
const { requireAuth, getAuth } = require('@clerk/express');
const Assignment = require('../models/assignment');

router.get('/', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const assignments = await Assignment.find({ userId }).sort({ deadline: 1 }).lean();
        res.json({ assignments });
    } catch (err) {
        console.error('GET /assignments error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { title, subject, deadline, status, marks } = req.body;

        if (!title || !deadline) {
            return res.status(400).json({ error: 'title and deadline are required' });
        }

        const assignment = await Assignment.create({
            userId,
            title,
            subject: subject || '',
            deadline: new Date(deadline),
            status: status || 'pending',
            marks: marks !== undefined && marks !== null ? parseInt(marks) : null,
        });

        res.status(201).json({ assignment });
    } catch (err) {
        console.error('POST /assignments error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/:id', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { status, marks } = req.body;

        const assignment = await Assignment.findOne({ _id: req.params.id, userId });
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        if (status) assignment.status = status;
        if (marks !== undefined) assignment.marks = marks;
        await assignment.save();

        res.json({ assignment });
    } catch (err) {
        console.error('PATCH /assignments error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const result = await Assignment.deleteOne({ _id: req.params.id, userId });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Assignment not found' });
        res.json({ ok: true, message: 'Assignment deleted' });
    } catch (err) {
        console.error('DELETE /assignments error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
