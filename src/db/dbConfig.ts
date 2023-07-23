import mongoose from "mongoose"

export async function Connect() {
  try {
    const mongo_uri = process.env.MONGO_URI
    if (!mongo_uri) {
      throw new Error("URI not found")      
    }
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on("connected", () => {
      console.log("MongoDB connected 🍀")
    })
    connection.on("error", (err) => {
      console.log("MongoDB error", err)
      process.exit(1)
    })
  } catch (error) {
    console.log("Something went wrong")
    console.log(error)
  }
}
