const {ObjectID} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


 // Todo.remove({}).then((result) => {
 //   console.log(result);
 // }

 // Todo.findOneAndRemove({_id: '5adfa45d33a986305cd0ec47'}).then((doc) => {
 //   console.log(doc);
 // })

 Todo.findByIdAndRemove('5adfa45d33a986305cd0ec47').then((docs) => {
   console.log(docs);
 })
