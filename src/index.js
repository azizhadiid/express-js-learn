import express from "express";
import url from "url";
import { parseArgs } from "util";

const app = express();
const port = 3000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));


app.get('/', (req, res) => {
    // res.send('Hello World');
    // res.json({
    //     nama: "Aziz",
    //     umur: 20
    // });
    // console.log(__dirname);
    res.sendFile("./pages/index.html", {root: __dirname});
});

app.get("/about", (req, res) => {
    res.sendFile("./pages/about.html", {root: __dirname});
});

app.get("/contact", (req, res) => {
    res.sendFile("./pages/contact.html", {root: __dirname});
});

app.get("/barang/:id", (req, res) => {
    // console.log(req.params);
    const id = req.params.id;
    res.send("Ini adalah halaman barang " + id);
});

app.use("*", (req, res) => {
    res.status(404);
    res.send("Halaman tidak ditemukan");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 