import express from "express";
import router from "./routes/index.js";
import path from "path";
import url from "url";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 