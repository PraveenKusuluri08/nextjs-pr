import { AvailableRoles, UserRoleEnum } from "@/constants"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { randomBytes, createHash } from "crypto"
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: AvailableRoles,
      default: UserRoleEnum.USER,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    loginType: {
      type: String,
      enum: ["GOOGLE", "EMAIL_PASSWORD"],
      default: "EMAIL_PASSWORD",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password!, 10)
  next()
})

userSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id!,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET_TOKEN!,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id!,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXP }
  )
}

userSchema.methods.generateTempTokens = function () {
  const userToken = randomBytes(25).toString("hex")

  const hashedToken = createHash("sha256").update(userToken).digest("hex")

  const tokenExpiry = Date.now() + 60 * 60 * 1000 // 60 minutes

  return { userToken, hashedToken, tokenExpiry }
}

export const Users =
  mongoose.models.Users ?? mongoose.model("Users", userSchema)
