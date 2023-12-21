const express = require('express')
const dotenv = require('dotenv')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()

const PORT = process.env.PORT

const newPlan = require('./src/new-plan')
const myPlan = require('./src/my-plan')
const setupPlan = require('./src/setup-plan')
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', newPlan)
app.use('/', myPlan)
app.use('/', setupPlan)



app.get('/', (req, res) => {
  res.send('<img src="https://media1.tenor.com/m/fSwZVENOqB4AAAAC/arisu-tachibana-idolmaster-cinderella-girls-u149.gif"/>')
})

app.listen(PORT, () => {
  console.log("berjalan di " + PORT)
})