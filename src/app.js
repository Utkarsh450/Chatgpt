require('dotenv').config();
const express = require('express');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const path = require("path")


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the 'public' directory

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

module.exports = app;