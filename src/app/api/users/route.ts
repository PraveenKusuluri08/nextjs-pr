import { NextRequest, NextResponse } from "next/server"
import { Connect } from "@/db/dbConfig"
import { Users } from "@/models/user"
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "@/helpers/validators"
import { sendEmail } from "@/utils/mail"
import {v4 as uuidv4} from "uuid"
import crypto from "crypto"

Connect()

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, mobile } =
      await request.json()
    console.log("validateEmail(email)", validateEmail(email!))
    console.log(password)
    if (!validateEmail(email)) {
      return NextResponse.json({
        message: "Please provide valid email address",
        status: 404,
      })
    }
    if (!validatePassword(password)) {
      return NextResponse.json({
        message: "Invalid Password.",
        constraints: [
          " Password must match with minimum 6 characters long and maximum 25 characters length",
          "Password must contains atleast one numerice character",
          "Password must contains atleast one numeric character",
        ],
        status: 404,
      })
    }
    if (!validateMobileNumber(mobile)) {
      return NextResponse.json({
        message: "Please provide valid mobile number",
        status: 404,
      })
    }
    const existedUser = await Users.findOne({ $or: [{ email }, { mobile }] })
    if (existedUser) {
      return NextResponse.json({
        message: "User with email addrss and mobile number is already exists",
        status: 409,
      })
    }
    const user: any = await Users.create({
      firstName,
      lastName,
      email,
      password,
      mobile,
    })
  
    const { userToken, hashedToken, tokenExpiry } = user?.generateTempTokens()
    console.log(hashedToken, userToken)
    const verification_id = uuidv4()
    const hashedVerificationToken = crypto.createHash("sha-256").update(verification_id).digest("hex")
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    user.verificationId= hashedVerificationToken
    
    await user.save({ validateBeforeSave: false })
    await sendEmail(
      email,
      "Please verify your email address",
      `<h1>Verify your email</h1> <p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${userToken}&_verificationID=${verification_id}>here</a> to verify your email</p>`
    )
    return NextResponse.json({
      message: "User created successfully",
      status: 201,
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    })
  }
}
