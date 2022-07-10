const express = require("express");
const app = express();
const cors = require("cors");

//database
const syncDatabase = require("./connection/sync-resync");
const db = require("./models/index.model");
syncDatabase(false, db);

app.use(express.json());
app.use(cors());

app.use(require("./routes/index.route"));

app.listen(3000, () => console.log("App listen in port 3000"));