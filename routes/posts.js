const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const PostService = require('../services/Post');

// GET users listing. */
router.get('/', (req, res, next) => {
  Post.find({status: 'accepted'})
    .lean()
    .then(posts => {
    posts = posts.map(post=>{
      post.votes = post.votes.length;
      return post;
    });
    res.send(JSON.stringify({
      posts: posts
    }));
  }).catch(err => res.status(400).send(err));
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
    res.send({message: 'Success'});
  }).catch(err => res.status(400).send(err));
});

router.post('/:postId/vote', (req, res, next) => {
  PostService.vote(req.params.postId, req._currentUser._id)
    .then(() => {
      res.send({message: 'Vote: Success'});
    }).catch(err => res.status(400).send({error: "BAAAD"}));
});

module.exports = router;