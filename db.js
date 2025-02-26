const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const MONGOURL_ATLAS = process.env.MONGODB_CLUSTER_URL;
const mongoURL = process.env.MONGODB_LOCAL_URL;
mongoose.connect(MONGOURL_ATLAS,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
  console.log('Connected to MongoDB server');
  
})

db.on('error',(error)=>{
  console.log('MongoDB coonection error : ',error);
  
})

db.on('disconnected',()=>{
  console.log('MongoDB disconnected');
  
})

module.exports = db;