const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');


const path = require("path");
const util = require("util");


router.get('/', (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: '1'
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',

        //Need to add the attribute here
    'img_url'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));

        //renders dasboard and passes posts as sequalized string
        res.render('dashboard', { posts});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', async (req,res)=>{

    try{
        const file = req.files.file;
        const fileName = file.name;
        const size = file.data.length;
        const extension = path.extname(fileName);

        const allowedExtensions = /png|jpeg|jpg|gif/;

        if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
        if (size > 5000000) throw "File must be less than 5MB";


        const md5 = file.md5;
        const URL = "/uploads/" + md5 + extension;

        await util.promisify(file.mv)("./public" + URL);
        res.redirect('/dashboard')
        //res.status(code)
        //Need to refresh page
        // res.render({
        //     message: "File uploaded successfully",
        //     url: URL,
        //     name: fileName
        // })

        Post.create({
            title: fileName,
            post_url: fileName,
            user_id: '1', //would need to be updated to req.session.user_id
            img_url: URL
          })
    
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err,
        })
    }
    
    
})


module.exports = router;