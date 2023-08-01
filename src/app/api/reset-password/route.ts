import { validatePassword } from "@/helpers/validators"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { Users } from "@/models/user"

export async function PUT(request: NextRequest) {
  const { token, password } = await request.json()
  try {
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
    const hashedToken = crypto.createHash("sha-256").update(token).digest("hex")
    const user = await Users.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })
    if (!user) {
      return NextResponse.json({
        message: "Token is invalid or expired",
        status: 404,
      })
    }

    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined
    user.password = password
    await user.save({ validateBeforeSave: false })
    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    })
  }
}
