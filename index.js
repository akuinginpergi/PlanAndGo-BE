const express = require('express')
const dotenv = require('dotenv')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()

const PORT = process.env.PORT

const newPlan = require('./src/new-plan/index')
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', newPlan)

app.listen(PORT, () => {
  console.log("berjalan di " + PORT)
})