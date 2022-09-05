const mongoose=require('mongoose');

const config=require('config');

const db=config.get('mongoURI');

//mongoose.connect(db) will return a promise
const connectDB=async()=>{
    try{
        await mongoose.connect(db);

        console.log('MongoDB connected')
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
        //Exit program
    }
}

module.exports=connectDB;