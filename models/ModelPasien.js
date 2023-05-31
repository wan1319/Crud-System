const mongoose = require("mongoose");

const pasienSchema = new mongoose.Schema({
    nama: String,
    umur: Number,
    alamat: String,
    penyakit: String,
});

const modelPasien = mongoose.model("modelPasien", pasienSchema);

module.exports = modelPasien;