require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*", // You can restrict this to your frontend URL later
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());
 

//static folder for uploads
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes Here
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
