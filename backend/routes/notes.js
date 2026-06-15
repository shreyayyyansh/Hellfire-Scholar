const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth, getAuth } = require('@clerk/express');
const Note = require('../models/note');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

function extractTags({ title, originalName, subject, category }) {
  const tags = new Set();
  if (subject) tags.add(subject.trim().toLowerCase());
  if (category) tags.add(category.trim().toLowerCase());
  const combined = ((title || '') + ' ' + (originalName || '')).toLowerCase();
  const words = combined.replace(/[\W_]+/g, ' ').split(/\s+/).filter((w) => w.length >= 3);
  words.slice(0, 8).forEach((w) => tags.add(w));
  return Array.from(tags).slice(0, 12);
}

router.post('/upload', requireAuth(), upload.single('file'), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { title, subject, category } = req.body;
    const originalName = req.file.originalname;
    const filename = req.file.filename;
    const url = `/uploads/${filename}`;
    const tags = extractTags({ title, originalName, subject, category });

    const note = await Note.create({
      userId,
      title: title || originalName,
      filename,
      originalName,
      url,
      subject: subject || '',
      category: category || '',
      tags,
    });

    res.status(201).json({ note });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error uploading file' });
  }
});

router.get('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { subject, category, page = 1, limit = 50 } = req.query;

    const filter = { userId };
    if (subject && subject.toLowerCase() !== 'all') {
      filter.subject = { $regex: `^${subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' };
    }
    if (category && category.toLowerCase() !== 'all') {
      filter.category = { $regex: `^${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const lim = Math.max(1, parseInt(limit, 10));
    const total = await Note.countDocuments(filter);
    const notes = await Note.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * lim).limit(lim).lean();

    res.json({ notes, total, page: pageNum, limit: lim });
  } catch (err) {
    console.error('Notes GET error:', err);
    res.status(500).json({ error: 'Server error fetching notes' });
  }
});

router.delete('/:id', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId !== userId) return res.status(403).json({ error: 'Forbidden' });

    const filepath = path.join(uploadsDir, note.filename);
    fs.unlink(filepath, (err) => {
      if (err && err.code !== 'ENOENT') console.warn('File delete error:', err);
    });

    await Note.deleteOne({ _id: note._id });
    res.json({ ok: true, message: 'Note deleted' });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ error: 'Server error deleting note' });
  }
});

module.exports = router;
