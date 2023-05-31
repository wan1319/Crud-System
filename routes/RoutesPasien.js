const express = require("express");
const multer = require("multer");
const modelPasien = require("../models/ModelPasien")

const routesPasien = express.Router();


routesPasien.post("/add", async (req, res) => {
    console.log(JSON.stringify(req.file));
    console.log(req.body);

    const pasien = new modelPasien({
        nama: req.body.nama,
        alamat: req.body.alamat,
        umur: req.body.umur,
        penyakit: req.body.penyakit,
        fotoPasien: req.file.filename
    });

    try {
        const newPasien = await pasien.save();
        res.status(201).send(pasien);
    } catch (err) {
        res.status(400);
    }
});

routesPasien.get("/all", async (req, res) => {
    try {
        const pasien = await modelPasien.find();
        res.json(pasien);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.post("/update/:id", async (req, res) => {
    try {
        const pasien = await modelPasien.findById(req.params.id);
        pasien.nama = req.body.nama;
        pasien.alamat = req.body.alamat;
        pasien.umur = req.body.umur;
        pasien.tanggalLahir = req.body.tanggalLahir;
        pasien.save();
        res.json(pasien);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.get("/search/:nama/", async (req, res) => {
    try {
        const pasien = await modelPasien.find({ nama: req.params.nama });
        res.json(pasien);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.get("/search/:nama/:umur", async (req, res) => {
    try {
        const pasien = await modelPasien.find({
            nama: req.params.nama,
            umur: req.params.umur,
        });
        res.json(pasien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.get("/rangeAge/:umur1/:umur2", async (req, res) => {
    try {
        const pasien = await modelPasien.find({
            umur: { $gte: req.params.umur1 },
            umur: { $lte: req.params.umur2 },
        });
        res.json(pasien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.get("/rangeAgeQ", async (req, res) => {
    try {
        const age1 = req.query.age;
        const pasien = await modelPasien.find({ umur: age1 });
        res.json(pasien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.get("/searchLike/:nama", async (req, res) => {
    try {
        const regex = new RegExp(req.params.nama, "i");
        const pasien = await modelPasien.find({ nama: { $regex: regex } });
        res.json(pasien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routesPasien.delete("/delete/:id", async(req, res) => {
    try {
        const pasien = await modelPasien.findByIdAndDelete(req.params.id);
        res.json(pasien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = routesPasien;