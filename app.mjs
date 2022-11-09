import express from 'express'
import path from 'path'
import url from 'url';
import './db.mjs';
import mongoose from 'mongoose';

const app = express();

const basePath = path.dirname(url.fileURLToPath(import.meta.url));
const publicPath = path.resolve(basePath, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

const User = mongoose.model('User');
const Table = mongoose.model('Table');

app.get('/', function(req, res) {

    User.find(function(err, titles, count) {
        console.log(titles);
        res.render( 'viewAll', {
      			title:titles
      		});

		});
});

app.post('/create', function(req, res) {
	console.log(req.body.username);
	new User({
		title: req.body.title,
	}).save(function(err, users, count){
		res.redirect('/');
	});

});

app.get('/user/create', function(req, res) {
  res.render('create');
});


app.get('/user', function(req, res) {

    User.find(function(err, users, count) {
        console.log(users);
        res.render( 'user', {
      			users:users
      		});

		});

});

app.post('/user/create', function(req, res) {
	console.log(req.body.username);
	new User({
		username: req.body.username,
    password: req.body.password
	}).save(function(err, users, count){
		res.redirect('/user');
	});

});

app.get('/user/create', function(req, res) {
  res.render('userCreate');
});

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.listen(PORT);
