const express = require("express"); 
const axios = require('axios');
const request = require('request-promise');
const dotenv = require('dotenv')
const PORT = 5000 || process.env.PORT

const app = express();
dotenv.config()

const baseUrl = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`;


app.get('/', (req, res) => {
  res.send("Welcome to amazon sraper API")
})

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try{
    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

    res.json(JSON.parse(response))
  }catch(error){
    res.json(error);
  }
})

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  try{
    const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);

    res.json(JSON.parse(response))
  }catch(error){
    res.json(error);
  }
})

app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  try{
    const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

    res.json(JSON.parse(response))
  }catch(error){
    res.json(error);
  }
})

app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  try{
    const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);

    res.json(JSON.parse(response))
  }catch(error){
    res.json(error);
  }
})


app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`))