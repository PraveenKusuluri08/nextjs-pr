"use client"

import Input from "@/components/Input"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
const ResetPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [conformPassword, setConformPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setIsPasswordVisible(!isPasswordVisible)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    setToken(token!)
  }, [])

  const handleResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.put("/api/reset-password", {
        token,
        password,
      })
      console.log(response)
      if (response.data.status === 404) {
        toast.error(response.data.message+" Please try again by clicking forgot password")
        return
      } 
      if (
        response.data.status === 404 &&
        response.data.constraints.length > 0
      ) {
        toast.error(
          response.data.constraints.map(
            (constraint: string) => "👉" + constraint + "\n\n"
          )
        )
        return
      }
      

      toast.success(response.data.message)
      router.push("/login")
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-3 grid h-screen content-center justify-center">
      <div className="w-full max-w-xl dark:bg-white">
        <h1 className="mb-2 tracking-wide mt-4 text-3xl leading-tight font-extrabold flex justify-center  text-gray-900">
          Reset Password
        </h1>

        <form
          action=""
          className="dark:bg-white flex flex-wrap shadow-4xl rounded px-3 pt-10 pb-10"
        >
          <div className="flex flex-wrap w-full mb-3">
            <div className="w-full px-3">
              <Input
                labelText={"password"}
                name={"password"}
                id={"password"}
                customClass="appreance-none border dark:bg-white text-gray-900 w-full py-3 px-4 focus:outline-gray-400 focus:bg-white"
                labelFor={"password"}
                type={isPasswordVisible ? "text" : "password"}
                isRequired={true}
                placeholderText={"Password"}
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full mb-3">
            <div className="w-full px-3">
              <Input
                labelText={"conform Password"}
                name={"confirm Password"}
                id={"confirmPassword"}
                customClass="appreance-none border dark:bg-white text-gray-900 w-full py-3 px-4 focus:outline-gray-400 focus:bg-white"
                labelFor={"confirm Password"}
                type={isPasswordVisible ? "text" : "password"}
                isRequired={true}
                placeholderText={"Conform Password"}
                handleChange={(e) => setConformPassword(e.target.value)}
                value={conformPassword}
              />
            </div>
          </div>
          <div className="flex justify-center items-center text-blue-700 px-3 leading-tight ">
            <div className="flex flex-wrap ">
              <input
                checked={isPasswordVisible}
                type="checkbox"
                onChange={(e) => handleShowPassword(e)}
              />
              <p className="px-2">Show Password</p>
            </div>
          </div>
          <div className="container flex flex-col mr-5 py-2">
            {password === "" || password !== conformPassword ? (
              <button
                type="button"
                disabled
                className="cursor-not-allowed bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Reset
              </button>
            ) : (
              <button
                className={`cursor-pointer bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
                  loading ? "cursor-progress" : ""
                }`}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleResetPassword(e)
                }
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
