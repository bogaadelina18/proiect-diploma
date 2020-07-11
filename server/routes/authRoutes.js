const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User');
const requireToken = require('../middleware/requireToken');

// const {jwtKey} = require(process.env.JWT_KEY)

module.exports = app => {
    app.post('/register', async (req, res) => {
        console.log(req.body)
        const { firstName, lastName, address, email, password } = req.body;

        try {

            const user = new User({ firstName, lastName, address, email, password });
            await user.save();
            jwt.sign({userId:user._id}, 'secretkey', (err, token)=>{
                res.json({
                    token
                })
            })
            // res.send({"token" :token})

        } catch (err) {
            res.send(err.message)
        }


    })
    app.post('/login',async (req,res)=>{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(422).send({error :"Must provide email or password"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(422).send({error :"Must provide email or password"})
        }
        try{
          await user.comparePassword(password);    
          const token = jwt.sign({userId:user._id}, 'secretkey')
          res.send({token})
        }catch(err){
            return res.status(422).send({error :"Must provide email or password"})
        }
        
    
    
    })

    app.get('/user', requireToken, (req, res) => {
        res.send({firstName: req.user.firstName, lastName: req.user.lastName, address:req.user.address, email: req.user.email})
         //res.status(200).send('Server is working, '+req.user.name+'  Your email is : '+req.user.email +', welcome')
    })

    app.post('/reset',async (req,res)=>{
        const {email} = req.body
        // if(!email || !password){
        //     return res.status(422).send({error :"Must provide email or password"})
        // }
        const user = await User.findOne({email})
        if(err || !user){
            return res.status(422).send({error :"Must provide email or password"})
        }
        try{
          //await user.comparePassword(password);    
          const token = jwt.sign({userId:user._id}, 'secretkey')
          const data= {
              from: 'noreplay@hello.com',
              to: email,
              subject: 'Account reset link',
              
          }
          res.send({token})
        }catch(err){
            return res.status(422).send({error :"Must provide email or password"})
        }
        
    
    
    })
    // app.post('/editProfile', (req,res)=>{
    //     const {name,email} = req.body
    //     if(!name || !email){
    //         return res.status(422).send({error :"Must provide name or email"})
    //     }
    //     const user = await User.findOne({name})
    //     if(!user){
    //         return res.status(422).send({error :"Must provide name or email"})
    //     }
    //     try{
    //         var name = req.body.name.trim();
    //         var email = req.body.email.trim();
    //         user.name = name;
    //         user.email = email;   
    //       const token = jwt.sign({userId:user._id}, 'secretkey')
    //       res.send({token})
    //       user.updateOne(function (err) {
    
    //        console.log("user saved")
    //         // res.redirect('/profile/');
    //     });
    //     }catch(err){
    //         return res.status(422).send({error :"Must provide name or email"})
    //     }
        
    
    
    // })

    // app.post('/editProfile', isLoggedIn, function(req, res, next){

    //     User.findById(req.user.id, function (err, user) {
    
    //         // todo: don't forget to handle err
    
    //         if (!user) {
    //             req.flash('error', 'No account found');
    //             return res.redirect('/edit');
    //         }
    
    //         // good idea to trim 
    //         var name = req.body.name.trim();
    //         var email = req.body.email.trim();
    //         // var username = req.body.username.trim();
    //         // var firstname = req.body.firstname.trim();
    //         // var lastname = req.body.lastname.trim();
    
    //         // validate 
    //         if (!email || !name ) { // simplified: '' is a falsey
    //             req.flash('error', 'One or more fields are empty');
    //             return res.redirect('/edit'); // modified
    //         }
    
    //         // no need for else since you are returning early ^
    //         user.email = email;
    //         // user.local.email = email; // why do you have two? oh well
    //         // user.first_name = firstname;
    //         user.last_name = name;
    //         // user.username = username;
    
    //         // don't forget to save!
    //         user.save(function (err) {
    
    //             // todo: don't forget to handle err
    
    //             res.redirect('/profile/');
    //         });
    //     });
    // });
}

