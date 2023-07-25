"use client"

import { Input } from "@/components/Input"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
const SignIn = () => {
  const router = useRouter()
  const [isPaswordVisible, setIspasswordVisible] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleTogglePasswordVisible = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    setIspasswordVisible(!isPaswordVisible)
  }

  const onSignIn = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <div className="grid h-screen content-center justify-center">
      <div className="w-full max-w-xl dark:bg-white">
        <h1 className="mb-2 tracking-wide mt-4 text-3xl leading-tight font-extrabold flex justify-center  text-gray-900">
          Sign in
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
                handleChange={handleChange}
                value={user.email}
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full mb-1">
            <div className="w-full px-3 relative container mx-auto">
              <Input
                labelText={"Password"}
                name={"password"}
                id={"password"}
                customClass="appreance-none  border dark:bg-white text-gray-900 w-full py-3 px-4 focus:outline-gray-400 focus:bg-white"
                labelFor={"password"}
                type={isPaswordVisible ? "text" : "password"}
                isRequired={true}
                placeholderText={"Password"}
                handleChange={handleChange}
                value={user.password}
              />
              <button
                className="absolute top-8 bottom-0 right-3 flex items-center px-4 py-3  text-gray-950"
                onClick={handleTogglePasswordVisible}
              >
                {isPaswordVisible ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.0}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </motion.svg>
                )}
              </button>
            </div>
          </div>

          <div className="container flex flex-col mr-5 py-2">
            <button
              onClick={(e: any) => onSignIn(e)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Sign up
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div className="container flex flex-col mr-4 py-2 justify-start items-start">
              <h3 className="pb-3 text-gray-800 tracking-tight leading-none font-bold">
                <span className="underline decoration-2 decoration-blue-500">
                  Not Having account
                </span>{" "}
                <mark
                  className="px-5 text-white bg-blue-600 rounded dark:bg-blue-500 cursor-pointer"
                  onClick={() => router.push("/signup")}
                >
                  Signup
                </mark>
              </h3>
            </div>

            <div className="container  flex mr-4 py-2 justify-end items-end">
              <h3 className="pb-3 text-gray-800 tracking-tight leading-none font-bold">
                <mark
                  className="px-6 text-white bg-orange-400 rounded dark:bg-orange-400 cursor-pointer"
                  onClick={() => router.push("/forgot-password")}
                >
                  Forgot Password
                </mark>
              </h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
