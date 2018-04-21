//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: "eat lunch"}).then((result) => {
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: "eat lunch"}).then((result) => {
  //   console.log(result);
  // });
 //findOneAndDelete
 // db.collection("Todos").findOneAndDelete({completed : false}).then((result) => {
 //   console.log(result);
 // })

// db.collection('Users').deleteMany({name: "Debabrata Pal"}).then((result) => {
//   console.log(result);
// })

db.collection('Users').findOneAndDelete({
  _id : new ObjectID('5adb3497db8cae1b2c8283df')
}).then((result) => {
  console.log(result);
})


});
