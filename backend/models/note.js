const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  filename: { type: String, required: true },
  originalName: { type: String },
  url: { type: String },
  subject: { type: String },
  category: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

NoteSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Note', NoteSchema);
