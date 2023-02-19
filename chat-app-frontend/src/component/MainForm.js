import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MainForm = () => {
    const [error,setError]=useState("")
    const [data,setData]=useState({
        room:'',
        name:''
    })

    const navigate=useNavigate()
  

    const handleChange=(e)=>{
         setData({
            ...data,
            [e.target.name]:e.target.value
         })
    }
   
    const validation=()=>{
        if(!data.name){
            setError("Please Enter your name!")
            return false
        }
        if(!data.room){
            setError("please select room")
            return false
        }
        setError('')
        return true
    }

    const handleSubmit=(e)=>{
           e.preventDefault()
           const isValid=validation()
           if(isValid){
             navigate(`/chat/${data.room}`, {state:data})
           }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <h2>Welcome to chat hub</h2>
        </div>
        <div>
            <input type='text' name='name' onChange={handleChange} placeholder='Enter name'/>
        </div>
        <div>
            <select name='room' onChange={handleChange}>
                <option value=''>Select Room</option>
                <option value='gaming'>Gaming</option>
                <option value='coding'>Coding</option>
                <option value='socialMedia'>Social Media</option>
            </select>
        </div>
        <button type='submit'>Submit</button>
        {error ? <h1>{error}</h1> : ""}
      </form>
    </div>
  )
}

export default MainForm
