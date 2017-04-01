const nodemailer = require('nodemailer');
const config = require('../config');
const jwt = require('jsonwebtoken');
const transporter = nodemailer.createTransport(config.mailer);
const User = require('../models/User');

const newPostRequestToAdmin = post => {
  console.log(post);
  User.findOne({_id:post.owner}).then(user=>{
    const senderName = user.email;
    const token = jwt.sign(new Date(), config.secret);
    let text=`User: ${senderName}<br>
              <br>${post.body}<br>
              <a target="_blank" href="${config.host}/admin/${post._id}/accept?token=${token}">Accept</a>
              <a target="_blank" href="${config.host}/admin/${post._id}/decline?token=${token}">Decline</a>`;
    User.findOne({role: 'admin'}).then(admin=>{
      let mailOptions = {
        from: `<${senderName}>`,//"" <foo@blurdybloop.com>', // sender address
        to: `${admin.email}`, // list of receivers
        subject: `New Post From: <${senderName}> ✔ ${post.title}`, // Subject line
        // text: text, // plain text body
        html: text // html body
      };

// send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    });
  });
};

module.exports = {
  newPostRequestToAdmin: newPostRequestToAdmin,
};