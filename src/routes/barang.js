// Import Express
import express from "express";
const barangRouter = express.Router(); // Membuat instance router untuk menangani rute terkait barang

// Import Multer untuk menangani file upload
import multer from "multer";

// Konfigurasi penyimpanan file dengan multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/"); // Menentukan folder penyimpanan file
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    ); // Mengambil ekstensi file
    cb(null, Date.now() + ext); // Menyimpan file dengan nama unik berdasarkan timestamp
  },
});

// Membuat instance multer dengan konfigurasi penyimpanan di atas
const upload = multer({
  storage: storage,
});

// Rute untuk menampilkan semua barang dan menambahkan barang baru
barangRouter
  .route("/")
  .get((req, res) => {
    res.send("Ini metode GET untuk mendapatkan semua barang");
  })
  .post(upload.single("attacment"), (req, res) => {
    let file = req.file; // Mendapatkan file yang diunggah
    let body = req.body; // Mendapatkan data dari body request
    console.log(file); // Menampilkan file di console
    console.log(body); // Menampilkan data request di console
    res.send("Ini metode POST untuk menambahkan barang");
  });

// Rute untuk menampilkan halaman insert barang
barangRouter.route("/insert").get((req, res) => {
  const data = {
    title: "Barang",
    layout: "layout/main-layout",
  };
  res.render("barang/index", data); // Merender halaman barang dengan template engine
});

// Rute dengan parameter ID untuk mendapatkan, mengupdate, atau menghapus barang berdasarkan ID
barangRouter
  .route("/:id")
  .get((req, res) => {
    res.send("Ini metode GET barang dengan ID = " + req.params.id);
  })
  .put((req, res) => {
    res.send("Ini metode PUT untuk mengupdate barang dengan ID = " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Ini metode DELETE untuk menghapus barang dengan ID = " + req.params.id);
  });

// Mengekspor router agar bisa digunakan di file lain
export default barangRouter;
