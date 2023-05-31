const express = require("express");
const mongoose = require("mongoose");
const routesPasien = require("./routes/RoutesPasien")

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/HospitalDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use("/pasien", routesPasien)


app.listen(port, () => {
    console.log(`mydatabase app running on http://127.0.0.1:${port}`);
});