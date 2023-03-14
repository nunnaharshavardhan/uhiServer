const express=require('express')
const app=express.Router()

app.post('/signin',(request,response) =>{
    response.send('send')
    user=request.body.username

})

module.exports=app