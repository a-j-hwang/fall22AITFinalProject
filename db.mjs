import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://jh6651:sSriSC4GuFQeeAij@cluster0.eztdrgk.mongodb.net/?retryWrites=true&w=majority')

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
