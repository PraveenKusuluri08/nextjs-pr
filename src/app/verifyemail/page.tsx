"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const VerifyEmail = () => {
  const [token, setToken] = useState("")
  const [verified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    setToken(token!)
  }, [])

  const verifyEmail = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const verifyResponse = await axios.post("/api/verify-email", { token })
      if (verifyResponse.data.status === 400) {
        toast.error(verifyResponse.data.message)
        return
      }
      toast.success(verifyResponse.data.message)
      router.push("/signin")
      return
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
      return
    }
  }
  console.log("token", token)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl leading-tight font-extrabold dark:text-white">
        Verify Email
      </h1>
      <p className="py-3 leading-tight">To access the Account please verify email address</p>
      <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={(e:any)=>verifyEmail(e)}>
        Verify Email
      </button>
    </div>
  )
}

export default VerifyEmail
