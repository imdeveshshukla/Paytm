const express = require ("express");
const app = express();
const router = require("./routes/index")
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json());

app.use("/api/v1",router);


app.listen(3000,console.log("Started"));