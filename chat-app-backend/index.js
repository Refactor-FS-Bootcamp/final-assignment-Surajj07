const express=require('express');
const {Server}=require('socket.io')
const http=require("http")
const cors=require('cors')

const app=express()
const port=process.env.PORT || 8080

app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
    // console.log(socket.id); 

    socket.on('joinRoom', room=>socket.join(room))

    socket.on('newMessage',({newMessage,room})=>{
          console.log(newMessage,room)
          io.in(room).emit("getNewMessage",newMessage)
    })
    
  });

app.get('/',(req,res)=>{
    res.send("welcome")
})

server.listen(port,()=>console.log(`this is ${port}`))