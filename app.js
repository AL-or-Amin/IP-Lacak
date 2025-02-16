const express = require("express");
const fs = require("fs");
const multer = require("multer");
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Konfigurasi multer untuk upload file audio
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Folder untuk menyimpan file audio
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file audio
    },
});
const upload = multer({ storage });

// Endpoint untuk menerima lokasi, IP, dan suara
app.post("/api/upload", upload.single("audio"), (req, res) => {
    const { latitude, longitude, ip } = req.body; // Data lokasi dan IP
    const audioFile = req.file; // File audio

    // Log data ke server
    console.log("Lokasi:", latitude, longitude);
    console.log("IP:", ip);
    console.log("File audio diterima:", audioFile);

    // Kirim respons ke frontend
    res.json({ message: "Data berhasil diterima" });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`))
