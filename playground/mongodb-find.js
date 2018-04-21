//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5adb42c0c660fa24fd0c0969')
  // }).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   if(err) {
  //     console.log("Unable to fetch todos", err);
  //   }
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count : ${count}`);
  // }, (err) => {
  //   if(err) {
  //     console.log("Unable to fetch todos", err);
  //   }
  // })

  db.collection('Users').find({name: "Debabrata Pal"}).toArray().then((users) => {
    console.log("user");
    console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
    if(err) {
      console.log('Unable to fetch the user with that name',err);
    }
  })

})
