import {NextRequest,NextResponse}  from "next/server"
import {Connect} from "@/db/dbConfig"
import { UserSignUpApiRequestBody } from "@/helpers/types"
import { Users } from "@/models/user"

Connect()

export function POST(request:UserSignUpApiRequestBody,response:NextResponse){
    try{
        const {firstName,lastName,email,password} = request.body
        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({message:"Please provide all the requried data",status:404})
        }
        
    }catch(error:any){
        console.log(error)

    }
}