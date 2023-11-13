require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUserName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error: '));

db.once('open', function () {
  console.log('DB connected successfully');
});

app.use(router);

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
