const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fetch = require("node-fetch");
require("dotenv").config();

const docsRouter = require("./routes/docs");
const controlsRouter = require("./routes/controls");
const soaRouter = require("./routes/soa");
const gapsRouter = require("./routes/gaps");
const risksRouter = require("./routes/risks");
const taskRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ensure folders exist
const dataDir = path.join(__dirname, "data");
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Use existing routers
app.use("/api/documents", docsRouter);
app.use("/api/controls", controlsRouter);
app.use("/api/soa", soaRouter);
app.use("/api/gaps", gapsRouter);
app.use("/api/risks", risksRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/users", usersRouter);


// Serve uploads
app.use("/uploads", express.static(uploadsDir));

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
