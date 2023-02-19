const express=require('express');
const {Server}=require('socket.io')
const http=require("http")
const cors=require('cors')

const app=express()
const port=8080

app.use(cors())

const server=http.createServer(app)
const io= Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.listen(port,()=>console.log(`this is ${port}`))