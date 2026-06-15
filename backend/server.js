require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { clerkMiddleware } = require('@clerk/express');

// Route imports
const userRoutes = require('./routes/user');
const notesRoutes = require('./routes/notes');
const assignmentRoutes = require('./routes/assignments');
const attendanceRoutes = require('./routes/attendance');
const syllabusRoutes = require('./routes/syllabus');

const app = express();

// ===== Middlewares =====
app.use(cors({ origin: '*', methods: 'GET,POST,PATCH,DELETE' }));
app.use(express.json());
app.use(clerkMiddleware());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes =====
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/syllabus', syllabusRoutes);

// Health check
app.get('/ping', (req, res) => res.json({ ok: true, msg: 'Server is running' }));

// ===== Start server =====
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  });