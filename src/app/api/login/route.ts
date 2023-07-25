import { NextRequest, NextResponse } from "next/server"

import { Connect } from "@/db/dbConfig"
import { Users } from "@/models/user"

Connect()

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json()
    const user = await Users.findOne({ email })

    if (!user) {
      return NextResponse.json({
        message: "User with this email address is not found",
        status: 404,
      })
    }

    const acccessToken = await user.generateJWTToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Password incorrect",
        status: 404,
      })
    }
    const loggedInUser = await Users.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )
    const response = NextResponse.json({
      message: `${user.role} Logged in successfully`,
      user: loggedInUser,
    })
    response.cookies.set("token", acccessToken, {
      httpOnly: true,
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 })
  }
}
