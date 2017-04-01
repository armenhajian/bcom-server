const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const PostService = require('../services/Post');

// GET users listing. */
router.get('/', async(req, res, next) => {
  const posts = await Post.find({status: 'accepted'});
  res.send(JSON.stringify({
    posts: posts
  }));
});
router.post('/', (req, res, next) => {
  const data = req.body;
  const post = new Post({
    title: data.title,
    body: data.body,
    owner: req._currentUser
  });
  post.save().then(() => {
    PostService.newPostRequestToAdmin(post);
    res.sendStatus(200);
  }).catch(err => res.status(400).send(err));
});


module.exports = router;