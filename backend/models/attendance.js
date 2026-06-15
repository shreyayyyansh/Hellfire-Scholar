const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    attended: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    required: { type: Number, default: 75 },
    updatedAt: { type: Date, default: Date.now },
});

// Compound index: one record per user per subject
AttendanceSchema.index({ userId: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
