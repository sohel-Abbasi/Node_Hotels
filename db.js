const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL,{
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