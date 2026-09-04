const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subject: { type: String, default: '' },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' },
    marks: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
