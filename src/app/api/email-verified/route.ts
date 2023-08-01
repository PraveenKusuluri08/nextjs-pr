import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { Users } from "@/models/user"
export async function POST(request: NextRequest) {
  const { verificationId } = await request.json()
  try {
    const verificationIdHash = crypto
      .createHash("sha256")
      .update(verificationId)
      .digest("hex")
    let user = await Users.findOne({
      verificationId: verificationIdHash,
      isEmailVerified: { $eq: true },
    })
    if (user) {
      return NextResponse.json({
        message: "Email Already verified",
        status: 301,
        isVerified:true
      })
    }
    return NextResponse.json({
      message: "",
      status: 200,
      isVerified:false
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Some thing went wrong",
      status: 500,
    })
  }
}
