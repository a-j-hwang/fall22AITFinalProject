import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB, (err, database) => {
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
    name: String,
    postedBy: User,
    link: [{body:"string"}],
    createdAt: { type: Date, default: Date.now },
});


mongoose.model('User', User);
mongoose.model('Table', Table);
