/* @require part */

const express = require('express')
const  bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

/* @use part */
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());


  /* @mongodb connection*/ 

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

client.connect(err => {
  const bookingCollection = client.db(`${process.env.DB_NAME}`).collection("request-booking");
  const rentHouseCollection = client.db(`${process.env.DB_NAME}`).collection("rent-house");

  console.log('database connection');
  
   /*@request-booking api */
  app.post('/request-booking',(req,res)=>{
        const bookingInfo = req.body;
        bookingCollection.insertOne(bookingInfo)
        .then(result=> res.status(200).send(result.insertedCount > 0));
  })

   /* @add-rent-house api */

  app.post('/add-rent-house',(req, res)=>{
    const file = req.files.file;
    const serviceTitle = req.body.serviceTitle;
    const price = req.body.price;
    const location = req.body.location;
    const bedrooms = req.body.bedrooms;
    const bathrooms = req.body.bathrooms;

    const newImg = file.data;
    const encImg = newImg.toString('base64');

    let image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64')
   };
    
   rentHouseCollection.insertOne({serviceTitle,price,location,bedrooms,bathrooms,image})
   .then(result=> res.send(result.insertedCount > 0));

  })





 
});



/* @default api */
app.get('/', (req, res) => {
  res.send('Hello World!')
})


const port  = 5000;
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})