// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('SIH SCA Backend up'));

// ✅ Add Auth Routes here
app.use('/api/auth', require('./routes/auth'));

// Existing Recommendation Route
app.use('/api/recommend', require('./routes/recommend'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
