const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/api", require("./routes/routes"));

server.listen(PORT, () => console.log("server is running on port " + PORT));
