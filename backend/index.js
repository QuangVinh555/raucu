const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const connectDB = require('./database/connectDB');
const cors = require('cors');
const route = require('./routes/index');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

// connectDB
connectDB();

// route
route(app);

const port = 8000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));