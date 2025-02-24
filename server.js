// var fs = require('fs');
// var os = require('os');

// const { json } = require("express")

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','hi '+user.username+'!\n',()=>{
//   console.log("file is created");

// })
// // console.log(os);
// console.log(fs);

// const notes = require("./notes");
// var _ = require('lodash');

// console.log('server file is running...');

// var age = notes.age;
// console.log(age);

// var result = notes.addition(age,1);
// console.log(result);

// var data = ['person','person',1,1,2,1,2,'name','age',3];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString('hello'));

// ------------ example of deppcopy using lodash library---
// let original = {
//   name:'Ahmed',
//   address: {
//     city:'gujrat'
//   }
// }
// const deepcopy = _.cloneDeep(original);
// here .cloneDeep() can copy recursively
//  and in deep copy it does'nt affect original object
// deepcopy.address.city = 'MUMBAI';
// console.log(original.address.city);

// const jsonString = '{"name":"john","age":24,"country":"India"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.country);
// // to convert json string to a javascript object so we use JSON.parse()

// const obj = {
//   name:'Sohel',
//   age:23,
//   city:'Ratlam'
// }

// const jsonString = JSON.stringify(obj);
// console.log(jsonString);

// to convert object or a value in a json string so we use JSON.stringify()

// ----------- here we create a server using express.js-------
const express = require("express");
const app = express();
const db = require("./db");




app.get("/", function (req, res) {
  res.send("hello world");
});

// app.get('/about',(req,res)=>{
//   res.send('you are inside of about page...');
// })

// app.get('/data',(req,res)=>{
//     const data = {
//       name:'Sohel',
//       age:23,
//       education:"B.tech",
//       passoutYear: 2023
//     }

//   res.send(data)
// })









// POST method for menuItems


const personRoutes = require("./routes/personRouter");
const menuRoutes = require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${3000}`);
});
