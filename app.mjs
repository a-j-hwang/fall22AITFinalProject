import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import './db.mjs';
import morgan from 'morgan';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const User = mongoose.model('User');
const Table = mongoose.model('Table');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        yay : 'Deployed!'
    });
});

app.get('/table', function(req, res) {
    Table.find(function(err, tables, count) {
        res.json(tables);
		});
});


app.post('/table', function(req, res) {
  let titletemp=req.body.title;
  var imagestemp=[];
  let urls = [
   "https://source.unsplash.com/300x300/?"+titletemp+"&1",
      "https://source.unsplash.com/300x300/?"+titletemp+"&2",
         "https://source.unsplash.com/300x300/?"+titletemp+"&3",
            "https://source.unsplash.com/300x300/?"+titletemp+"&4",
               "https://source.unsplash.com/300x300/?"+titletemp+"&5",
                  "https://source.unsplash.com/300x300/?"+titletemp+"&6",
                     "https://source.unsplash.com/300x300/?"+titletemp+"&7",
                     "https://source.unsplash.com/300x300/?"+titletemp+"&8",
                     "https://source.unsplash.com/300x300/?"+titletemp+"&9",
 ]
 Promise.all(urls.map(u=>fetch(u))).then(responses =>
     Promise.all(responses.map(res => res.url))
 ).then(texts => {
    imagestemp=texts;
    new Table({
      title: req.body.title,
      postedBy: req.body.postedBy,
      great:0,
      bad:0,
      images:texts,
    }).save()
 })


});


app.post('/table/great', function(req, res) {
  console.log(req.body);
  Table.find({ _id: req.body._id}, function (err, docs) {
    docs[0].great++;
    docs[0].save();

  })
});


app.post('/table/bad', function(req, res) {
  console.log(req.body);
  Table.find({ _id: req.body._id}, function (err, docs) {
    docs[0].bad++;
    docs[0].save();

  })
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
