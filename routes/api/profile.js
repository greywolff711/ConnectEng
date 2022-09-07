const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const { check, validationResult } = require('express-validator');
const { json } = require('express');

//@route  GET api/profile/me
//@desc   get the user details
//@access Private

router.get('/me',auth,async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile)return res.status(400).json({msg:'No Profile found'});
        res.json(profile);
    }
    catch(err){

    }
});

//@route  POST api/profile
//@desc   post the user details
//@access Private

router.post('/',
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
        //Start building profile object
        const {
            website,
            skills,
            company,
            location,
            bio,
            status,
            youtube,
            twitter,
            linkedin,
            instagram,
        } = req.body;
        const profileFields={};
        profileFields.user=req.user.id;
        if(company)profileFields.company=company;
        if(website)profileFields.company=company;
        if(location)profileFields.location=location;
        if(bio)profileFields.bio=bio;
        if(status)profileFields.status=status;
        if(skills)profileFields.skills=skills.split(',').map(skill=>skill.trim());

        //Build Social object
        profileFields.social={};

        if(youtube)profileFields.social.youtube=youtube;
        if(twitter)profileFields.social.twitter=twitter;
        if(linkedin)profileFields.social.linkedin=linkedin;
        if(instagram)profileFields.social.instagram=instagram;
        console.log(profileFields.skills);

        try{
            let profile=await Profile.findOne({user:req.user.id});

            //If profile is found
            if(profile){
                profile=await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileFields},
                    {new: true}
                )

                return res.json(profile);
            }

            //New profile
            profile=new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        }
        catch(err){
            console.log(err.message);
            res.status(500).json({msg:'Server Error'})
        }

        res.send('Hello');
    })

//@route  GET api/profile
//@desc   get all profiles
//@access Public

router.get('/',async (req,res)=>{
    try {
        const profiles=await Profile.find().populate('user',['name','avatar']);
        res.send(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

//@route  GET api/profile/user/:user_id
//@desc   get profile of user from id
//@access Public

router.get('/user/:user_id',async (req,res)=>{
    const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

    if(!profile)res.status(400).send('Invalid user ID');

    res.json(profile);
})

//@route  DELETE api/profile
//@desc   Delete profile,user
//@access Private

router.delete('/',auth,async (req,res)=>{
    await Profile.findOneAndRemove({user:req.user.id});
    await User.findOneAndRemove({_id:req.user.id});

    res.json({msg:'User removed'});
})

//@route  PUT api/profile/experience
//@desc   Add experience and work
//@access Private

router.put(
    '/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req,res)=>{
        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }=req.body;
        const newExperience={
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            const profile=await Profile.findOne({user:req.user.id});
            profile.experience.unshift(req.body);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    })

    //@route  DELETE api/profile/experience/:exp_id
    //@desc   delete experience
    //@access Private

    router.delete('/experience/:exp_id',auth,async(req,res)=>{
        try {
            const profile=await Profile.findOne({user:req.user.id});
            console.log(profile.name);
            const removedIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
            profile.experience.splice(removedIndex,1);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    })
module.exports=router;