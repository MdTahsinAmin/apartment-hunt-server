// require part 
const express = require('express')
const  bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');
require('dotenv').config()

// use part 
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());



app.get('/', (req, res) => {
  res.send('Hello World!')
})




const port  = 5000;
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})