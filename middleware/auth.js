const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res,next){
    //Get the token
    const token=req.header('x-auth-token');

    //Check if no token is present
    if(!token)return res.status(401).json({msg:'No token found!! Not authorized'});

    //Verify token
    try{
        const decoded=jwt.verify(token,config.get('jwttoken'));
        req.user=decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({msg:'No token found!'});
    }
}