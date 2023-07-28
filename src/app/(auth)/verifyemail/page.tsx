"use client"
import React, { useState,useEffect} from 'react'

const VerifyEmail = () => {
  const [token,setToken]= useState("")
  const [verified,setIsVerified]= useState(false)
  
  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    setToken(token!)
  },[])

  useEffect(()=>{

    (async function(){
      try{
        
      }catch(error){
        
      }
    })()
  },[token])
  
  return (
    <div>page</div>
  )
}

export default VerifyEmail