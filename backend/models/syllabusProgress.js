const mongoose = require('mongoose');

const SyllabusProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    completedTopics: { type: [String], default: [] },
    updatedAt: { type: Date, default: Date.now },
});

SyllabusProgressSchema.index({ userId: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('SyllabusProgress', SyllabusProgressSchema);
