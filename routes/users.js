const express = require('express');
    const router = express.Router();
    const User = require('../models/User');

  // GET users listing. */
    router.get('/', async (req, res,next) => {
        const location = req.body.location;
        const users = await User.find({location: location});
        res.send(JSON.stringify({
            users: users
        }));
    });
    // router.post('/', async (req, res, next) => {
    //     const data = req.body;
    //     const user = new User(data);
    //     const result = await user.save();
    //     console.log('user add/update result: ', result);
    //     res.send(JSON.stringify({
    //         status: result
    //     }));
    // });
    // router.delete('/:user', async (req, res, next) => {
    //     const id = req.params.user;
    //     const user = await User.find({ _id: id});
    //     const result = await user.remove();
    //     console.log('user delete result: ', result);
    //     res.send(JSON.stringify({
    //         status: result
    //     }));
    // });


module.exports=router;