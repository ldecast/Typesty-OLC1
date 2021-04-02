const express = require('express');
const cors = require('cors');
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

// var input = "";
// var output = "";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("/home/ldecast/Compi 1/Proyecto2/typesty/dist/typesty"));

app.get('/', (req, res) => {
  res.sendFile("/home/ldecast/Compi 1/Proyecto2/typesty/src/index.html");
});

app.post('/compile', (req, res) => {
  const input = req.body.input;
  const output = input + "\ninput compiled.";
  res.status(200).send({ "output": output });
});

app.listen(port, () => {
  console.log(`Server listening on the port: ${port}`);
});