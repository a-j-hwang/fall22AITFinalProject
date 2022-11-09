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
  res.render('create');
});



/*

const Cat = mongoose.model('Cat');

app.get('/cats', function(req, res) {
	Cat.find(function(err, cats, count) {
    console.log(cats);
		//res.render( 'cats', {
	//		cats: cats
	//	});
	});
});
*/
/*
app.get('/cat/create', function(req, res) {
  res.render('create');
});



app.post('/cat/create', function(req, res) {
	console.log(req.body.catName);
	new Cat({
		name: req.body.catName,
		updated_at : Date.now()
	}).save(function(err, cat, count){
		res.redirect('/cats');
	});
});*/

app.set('view engine', 'hbs');
app.listen(3000);
