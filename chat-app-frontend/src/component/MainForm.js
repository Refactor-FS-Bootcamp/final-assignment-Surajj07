import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './mainform.css'

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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='heading'>
            <h2>Welcome to <span className='start'>Chat</span><span className='end'>Hub</span></h2>
        </div>
        <div className='nameInput'>
            <input type='text' name='name' onChange={handleChange} placeholder='Enter name'/>
        </div>
        <div className='selectRoom'>
            <select name='room' onChange={handleChange}>
                <option value=''>Select Room</option>
                <option value='Gaming'>Gaming</option>
                <option value='Coding'>Coding</option>
                <option value='Social Media'>Social Media</option>
            </select>
        </div>
        <button className='formSubmit' type='submit'>Submit</button>
        {error ? <h1>{error}</h1> : ""}
      </form>
    </div>
  )
}

export default MainForm
