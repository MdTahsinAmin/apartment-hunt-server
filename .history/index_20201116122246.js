const express = require('express')
require('dotenv').config()
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log(process.env)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})