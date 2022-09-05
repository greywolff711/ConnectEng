const express=require('express');

const app=express();

app.get('/',(req,res)=>res.send('API RUNNING'));

const PORT=process.env.PORT||5000
// THIS WILL LOOK FOR ENV VARIABLE NAMED PORT if none found connect with 5000

app.listen(PORT,()=>console.log(`Server started on Port ${PORT}`));