const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require('./User');
// const CommentSchema = require('./Comment');
// const VoteSchema = require('./Vote');

const postSchema = new Schema({
  title: {type: String, required: true},
  body: {type:String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
  votes: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
  status: {type: String, enum: ['accepted', 'declined', 'pending'], default:'pending'},
},
{timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;