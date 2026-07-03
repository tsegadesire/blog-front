const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const user = require('./routes/user');
const errorMiddleware = require('./middleware/errorMiddleware');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');





connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // <--- EXACT URL OF YOUR FRONTEND
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and authorization headers to be sent
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', user);
app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
