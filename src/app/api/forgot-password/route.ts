import VerifyEmail from "@/app/(auth)/verifyemail/page"
import { Connect } from "@/db/dbConfig"
import { validateEmail } from "@/helpers/validators"
import { Users } from "@/models/user"
import { sendEmail } from "@/utils/mail"
import { NextRequest, NextResponse } from "next/server"

Connect()

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  try {
    if (!validateEmail(email)) {
      return NextResponse.json({
        message: "Invalid Email address.",
        status: 404,
      })
    }
    const user = await Users.findOne({ email })
    if (!user) {
      return NextResponse.json({
        message: "User with requested email address is not found",
        status: 404,
      })
    }
    const { userToken, hashedToken, tokenExpiry } = user.generateTempTokens()
    user.forgotPasswordToken = hashedToken
    user.forgotPasswordTokenExpiry = tokenExpiry
    await user.save({ validateBeforeSave: true })

    await sendEmail(
      email,
      "Requested to reset password",
      `<h1>To reset the password</h1> <p>Click <a href=${process.env.DOMAIN}/reset-password?token=${userToken}>here </a>To reset the password</p>`
    )
    return NextResponse.json({
      message: `Reset Password link is send to ${email} please check`,
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Some thing went wrong",
      status: 500,
    })
  }
}
