"use client"

import React, { FC, useState } from "react"
import { motion } from "framer-motion"
import Input from "@/components/Input"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


type SignUpType = {
  firstName:string,
  lastName:string,
  email: string,
  password: string,
  mobile:string
}


const SignUp: FC = () => {
  const router = useRouter()
  const [user, setUser] = useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  })

  const [isPaswordVisible, setIspasswordVisible] = useState(false)
  //TODO:To handle the backend errors
  const [errors, setErrors] = useState<{
    message: string
    status: number
    constraints?: string[]
  }>()
  const [loading, setLoading] = useState(false)

  const handleTogglePasswordVisible = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    setIspasswordVisible(!isPaswordVisible)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUser({ ...user, [e.target.name]: value })
  }

  const onSignUp = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post("/api/users", user)
      console.log(response)

      if (response.data.status === 409) {
        toast.error(response.data.message)
      }

      if (response.data.status === 404) {
        toast.error(response.data.message)
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
      }
      if (response.data.status === 201) {
        toast.success(response.data.message)
        setUser({
          email: "",
          firstName: "",
          lastName: "",
          mobile: "",
          password: "",
        })
        router.push("/signin")
      }
    } catch (error: any) {
      console.log(error.response)
      setErrors(error.response.data)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  console.log(user)
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
            Sign up
          </h1>
          <form
            action=""
            className="dark:bg-white flex flex-wrap shadow-4xl rounded px-5 pt-10 pb-10"
          >
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <Input
                autoFocus={true}
                labelText={"FirstName"}
                name={"firstName"}
                id={"firstName"}
                labelFor={"firstname"}
                type={"text"}
                isRequired={true}
                placeholderText={"firstname"}
                // divClassName={"w-full md:w-1/2 px-3 md:mb-0"}
                handleChange={handleChange}
                value={user.firstName}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <Input
                labelText={"LastName"}
                name={"lastName"}
                id={"lastName"}
                labelFor={"lastName"}
                type={"text"}
                isRequired={true}
                placeholderText={"LastName"}
                handleChange={handleChange}
                value={user.lastName}
              />
            </div>

            <div className="flex flex-wrap w-full mb-2">
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

            <div className="flex flex-wrap w-full mb-4">
              <div className="w-full focus:outline-gray-400 focus:bg-white mt-3 px-3 relative container mx-auto text-gray-800">
                <label
                  htmlFor="mobile"
                  className="dark:bg-white block uppercase tracking-wide text-gray-800 text-sm font-bold mb-3 "
                >
                  Mobile Number
                </label>

                <PhoneInput
                  value={user.mobile}
                  onChange={(phone) =>
                    setUser({ ...user, mobile: "+" + phone })
                  }
                  inputStyle={{
                    width: "100%",
                    letterSpacing: "0.025em",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                  }}
                  inputProps={{
                    name: "mobile",
                    required: true,
                  }}
                  containerStyle={{ fontWeight: "700" }}
                  placeholder="Mobile Number"
                  country="in"
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
                onClick={(e: any) => onSignUp(e)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Sign up
              </button>
            </div>

            <div className="container flex flex-col mr-5 py-2 justify-center items-center">
              <h1 className="pb-3 text-gray-800 tracking-tight leading-none font-extrabold">
                <span className="underline underline-offset-3 decoration-4 decoration-blue-500 mr-2">
                  Having account
                </span>{" "}
                <mark
                  className="px-5 text-white bg-blue-600 rounded dark:bg-blue-500 cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Login
                </mark>
              </h1>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default SignUp
