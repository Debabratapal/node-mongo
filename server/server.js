const _  = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
  });

  app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      res.send(todos)
    }, (e) => {
      res.status(400).send(e)
    })
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
      res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });
});

 app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;
   if(!ObjectID.isValid(id)) {
     return res.status(404).send()
   }
   Todo.findByIdAndRemove(id).then((docs) => {
     if(!docs) {
       return res.status(404).send()
     }
     res.status(200).send({docs})
   }, (e) => {
     res.send(400).send();
   });
 });

 app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   if(!ObjectID.isValid(id)) {
     return res.status(404).send()
   }

   if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
   } else {
      body.completed = false;
      body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo) => {
     if(!todo) {
       return res.status(404).send()
     }
     res.send({todo});
   }).catch((e) => {
     res.status(400).send()
   });
});

//POST user
 app.post('/user', (req, res) => {

   var body =_.pick(req.body, ['email', 'password']);

   var user = new User(body);

   user.save().then(() => {
     return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
     res.status(400).send(e);
   });
 });


 app.get('/user/me', authenticate, (req, res) => {
   res.send(req.user);
 });

 app.post('/user/login', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);

   User.findByCredentials(body.email, body.password).then((user) => {
     return user.generateAuthToken().then((token) => {
       res.header('x-auth', token).send(user);
     })
   }).catch((e) => {
     res.status(400).send(e);
   });
 });

 app.delete('/user/me/token', authenticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
     res.status(200).send();
   }, () => {
     res.status(400).send();
   });
 });











app.listen(port, () => {
  console.log(`Started up at port ${port}`);
})

module.exports = { app }
