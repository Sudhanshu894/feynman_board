const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const HandleError = require('./middlewares/ErrorHandler');

const UserController = require('./routes/User.route');
const TopicController = require('./routes/Topic.route');


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: './Backend/configs/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/feynman-board/api', UserController);
app.use('/feynman-board/api', TopicController);

// Routes to Connect server to frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

// ErrorHandling
app.use(HandleError);

module.exports = app;