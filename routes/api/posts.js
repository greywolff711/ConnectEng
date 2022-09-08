const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const Post=require('../../models/Post');
const Profile=require('../../models/Profile');

//@route  POST api/post
//@desc   post a request
//@access Private

router.post('/',
    auth,
    check('text','text is required').not().isEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try {
            const user=User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
              });
            
            const post=await newPost.save();
            res.json(post);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }

    });

    //@route  GET api/post
    //@desc   get all request
    //@access Private

    router.get('/',auth,async (req,res)=>{
        try {
            const posts=await Post.find().sort({date:-1});
            res.json(posts);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });

    //@route  GET api/post/:id
    //@desc   get post
    //@access Private
    router.get('/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            if(!post){
                return res.status(400).send('No post found');
            }
            res.json(post);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    })

    //@route  delete api/post/:id
    //@desc   get post
    //@access Private
    router.delete('/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            if(post.user!=req.user.id){
                return res.status(401).send('User not authorized');
            }

            await post.remove();
            res.json({msg:'Post removed'});
        } 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    })

    //@route  PUT api/post/like/:id
    //@desc   like post
    //@access Private
    router.put('/like/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            
            if (post.likes.some((like) => like.user.toString() === req.user.id)) {
                return res.status(400).send('Msg already liked');
            }

            post.likes.unshift({user:req.user.id});
            await post.save();
            res.json(post.likes);
        } 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    })

    //@route  PUT api/post/unlike/:id
    //@desc   dislike post
    //@access Private
    router.put('/unlike/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            
            if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
                return res.status(400).send('Msg has not been liked yet');
            }

            const removedIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removedIndex,1);
            await post.save();
            res.json(post.likes);
        } 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    })

    //@route  POST api/post/comment/:id
    //@desc   comment on a post
    //@access Private
    router.post('/comment/:id',
    auth,
    check('text','Text is required').not().isEmpty(),
    async(req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const user=User.findById(req.user.id).select('-password');
        try {
            const post=await Post.findById(req.params.id);
            const newComment={
                user:req.user.id,
                text:req.body.text,
                name:user.name,
                avatar:user.avatar
            }
            post.comments.unshift(newComment);

            await post.save();
            res.json(post.comments);
        } 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    })
module.exports=router;