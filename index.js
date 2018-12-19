const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = app.listen(3000, () => {
    console.log("Server is running");
});
