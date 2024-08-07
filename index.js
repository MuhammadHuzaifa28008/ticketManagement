const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const url = require("url");
const path = require("path");

const customerRoutes = require("./routes/customerRoutes.js");


dotenv.config({path: './config/.env'});

// const buildHtml = new URL('./client/build/index.html', import.meta.url);

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.dbURI;

const app = express();


app.use(express.json());
app.use(cors());
app.use("/customer", customerRoutes);
// app.use("/free-apis", apiRoutes);
app.use(express.static("./client/dist"));

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

try {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("connected with mongodb"))
    .catch((err) => console.log(err.message));
} catch (error) {
  console.log("mongoose connection error : " + error.message);
}

try {
  app.listen(PORT, () => console.log(`server runing at : ${PORT}`));
} catch (err) {
  console.log("server connection err : " + err);
}
