import mongoose from 'mongoose';
const { Schema } = mongoose;
const MONGODB = process.env.MONGODB;
mongoose.connect(MONGODB, (err, database) => {
  if (err) {
console.log(err);
  } else {
console.log('Connected to database');
  }
});

const User = new Schema({
    username:  String,
    password: String,
});

const Table = new Schema({
    title: String,
    postedBy: User,
    link: [{body:"string"}],
    createdAt: { type: Date, default: Date.now },
});


mongoose.model('User', User);
mongoose.model('Table', Table);
