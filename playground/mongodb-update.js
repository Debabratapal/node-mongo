//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id : new ObjectID('5adb4dbec660fa24fd0c0d69')
  // }, {
  //   $set: {
  //     completed : true
  //   }
  // }, {
  //   returnOriginal : false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5adb3300f7d1c51b6c8d2248')
  }, {
    $set: { name : "Sonu", location : "Siliguri" },
    $inc: { age : 5 }
  }, {
    returnOriginal : false
  }).then ((result) => {
    console.log(result);
  })

});
