const express = require('express');
// const mongoose = require('mongoose');

const app = express();

// Security middleware
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:5000'], // Deployed front end URL can be added with ,
    optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());

// Root route
app.get('/', (request, response) => {
    response.json({
        message: "Hello from TASKey!",
    });
});

// All route paths that don't exist
app.all(/.*/, (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});

module.exports = app;