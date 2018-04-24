const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//
// var id = '5adf07867255262888f57030';
//
// if(!ObjectID.isValid(id)) {
//   console.log("ID not valid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos:', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log("todos:",todo);
// })

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e))


var userID = '5adc4bad8408c910649d2d83';

User.findById(userID).then((user) => {
  if(!user) {
    return console.log('ID not found');
  }
  console.log('user :', user);
}).catch((e) => console.log(e));
