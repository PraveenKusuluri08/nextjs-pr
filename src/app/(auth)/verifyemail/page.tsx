"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const VerifyEmail = () => {
  const [token, setToken] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verificationId, setVerificationId] = useState("")
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    const verificationId = urlParams.get("_verificationID")
    setToken(token!)
    setVerificationId(verificationId!)
  }, [])

  useEffect(() => {
    try {
      axios.post("api/email-verified", { verificationId }).then((res) => {
        console.log("res", res)
        if (res.data.isVerified) {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [verificationId])

  console.log(isVerified)

  const verifyEmail = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const verifyResponse = await axios.post("/api/verify-email", {
        token,
        verificationId,
      })
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {isVerified ? (
        <p className="py-3 leading-tight">Email is already verified</p>
      ) : (
        <div>
          <h1 className="text-2xl leading-tight font-extrabold dark:text-white">
            Verify Email
          </h1>
          <p className="py-3 leading-tight">
            To access the Account please verify email address
          </p>
          <button
            className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded ${
              loading ? "cursor-progress" : ""
            }`}
            onClick={(e: any) => verifyEmail(e)}
          >
            Verify Email
          </button>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
