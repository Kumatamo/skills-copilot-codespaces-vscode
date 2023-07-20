// Create web server
const express = require('express');
const app = express();
// parse body of request
const bodyParser = require('body-parser');
// connect to database
const mongoose = require('mongoose');
// connect to database
mongoose.connect('mongodb://localhost:27017/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// create model
const Comment = mongoose.model('Comment', commentSchema);
// use body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
// use public folder
app.use(express.static(__dirname + '/public'));
// use ejs
app.set('view engine', 'ejs');
// use routes
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments', {
        comments: comments
      });
    }
  });
});
// post route
app.post('/comments', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  comment.save(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
// port to listen
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
