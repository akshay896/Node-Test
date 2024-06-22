require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router');
require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

app.get('/', (req, res) => {
  res.status(200).send('<h1>Server started</h1>');
});

app.post('/', (req, res) => {
  res.status(200).send('POST REQUEST');
});
