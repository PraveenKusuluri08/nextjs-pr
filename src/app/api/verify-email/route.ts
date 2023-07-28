import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { Users } from "@/models/user"

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  try {
    const emailVerificationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")

    const user = await Users.findOne({
      emailVerificationToken,
      emailVerificationExpiry: { $gt: Date.now() },
    })
    if (!user) {
      return NextResponse.json({
        message: "Token is invalid or expired.",
        status: 400,
      })
    }
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    user.isEmailVerified = true

    await user.save({ validateBeforeSave: false })

    return NextResponse.json({
      message: "Email verified successfully",
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: "Some thing went wrong",
      status: 500,
    })
  }
}
