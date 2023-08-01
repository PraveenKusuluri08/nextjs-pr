"use client"

import Input from "@/components/Input"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
const page = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/forgot-password", { email })
      if (response.data.status === 404) {
        toast.error(response.data.message)
        return
      }
      toast.success(response.data.message)
      router.push("/signin")
      return
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="grid h-screen content-center justify-center">
      {loading ? (
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading ...
          </span>
        </h1>
      ) : (
        <div className="w-full max-w-xl dark:bg-white">
          <h1 className="mb-2 tracking-wide mt-4 text-3xl leading-tight font-extrabold flex justify-center  text-gray-900">
            Forgot Password
          </h1>

          <form
            action=""
            className="dark:bg-white flex flex-wrap shadow-4xl rounded px-5 pt-10 pb-10"
          >
            <div className="flex flex-wrap w-full mb-3">
              <div className="w-full px-3">
                <Input
                  labelText={"Email"}
                  name={"email"}
                  id={"email"}
                  customClass="appreance-none border dark:bg-white text-gray-900 w-full py-3 px-4 focus:outline-gray-400 focus:bg-white"
                  labelFor={"email"}
                  type={"email"}
                  isRequired={true}
                  placeholderText={"Email"}
                  handleChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div className="container flex flex-col mr-5 py-2">
              <button
                onClick={(e: any) => handleClick(e)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Reset Link
              </button>
            </div>

            <div className="container flex flex-col mr-4 py-2 justify-center items-center">
              <h3 className="pb-3 text-gray-800 tracking-tight leading-none font-bold">
                <span className="underline decoration-2 decoration-blue-500">
                  Having account
                </span>{" "}
                <mark
                  className="px-5 text-white bg-blue-600 rounded dark:bg-blue-500 cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Signin
                </mark>
              </h3>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default page
