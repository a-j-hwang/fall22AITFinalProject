import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import './db.mjs';
import morgan from 'morgan';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Table = mongoose.model('Table');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Deployed!'
    });
});

app.get('/table', function(req, res) {
    Table.find(function(err, tables, count) {
        console.log(tables);
        res.json(tables);
		});
});

app.post('/table', function(req, res) {
	console.log(req.body);
	new Table({
		title: req.body.title,
    postedBy: req.body.postedBy
    //generate images thru unsplash
	}).save(function(err, users, count){
		res.redirect('/table');
	});
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
