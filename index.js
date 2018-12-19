const express = require('express');
const expressValidator = require('express-validator');
const authRouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressValidator());

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

const mongoURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true});

mongoose.connection.on('error', (err) => {
    console.log('Error Connected to DB', err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});

app.use('/api/auth', authRouter);
