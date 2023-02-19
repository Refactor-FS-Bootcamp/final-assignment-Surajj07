import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment'
import io from 'socket.io-client'

const ChatRoom = () => {
  const location=useLocation();
  const msgBoxRef=useRef()
  const [data,setData]=useState({})
  const [msg,setMsg]=useState('')
  const [allMessages,setAllMsg]=useState([])
  const [socket,setSocket]=useState()

  useEffect(()=>{
    const socket=io('http://localhost:8080/')
    setSocket(socket)

    socket.on("connect", () => {
        console.log(socket.id);
        socket.emit("joinRoom", location.state.room)
      });

  },[])

  // console.log(allMessages)

  useEffect(()=>{

    if(socket){
      socket.on("getNewMessage", (newMessage) => {
        // console.log(newMessage)
        setAllMsg([...allMessages,newMessage])
        msgBoxRef.current.scrollIntoView({behavior: "smooth"})
        setMsg('')
    })  
    }
  },[socket,allMessages])
  
  useEffect(()=>{
    setData(location.state)
  },[location])

  const handleEnter = e => e.keyCode===13 ? handleMessage() : ""
  const handleChange=(e)=>{
       setMsg(e.target.value)
  }

  const handleMessage=()=>{
    const newMessage={time:new Date(), msg, name:data.name}
    socket.emit("newMessage",{newMessage, room:data.room})
  }

  return (
    <div>
      <div>
        <h1>{data?.room} chat Room</h1>
      </div>

      <div>
        {
            allMessages.map(ele =>{ 
              
                return data.name===ele.name 
                ? 
                <div>
                    <div>
                        <div>
                            <strong>{ele.name}</strong>
                            <small><Moment fromNow>{ele.time}</Moment></small>
                        </div>
                        <h4>{ele.msg}</h4>
                    </div>
                </div>
                 :
                 <div>
                    <div>
                        <div>
                            <strong>{ele.msg}</strong>
                            <small><Moment fromNow>{ele.time}</Moment></small>
                        </div>
                        <h4>{ele.msg}</h4>
                    </div>
                 </div>
            })
        }
        <div ref={msgBoxRef}></div>
       </div>

       <div>
        <input type='text' name='message' onChange={handleChange} onKeyDown={handleEnter} value={msg} placeholder='Type your message'/>
        <button onClick={handleMessage}>send</button>
       </div>
    </div>
  )
}

export default ChatRoom
