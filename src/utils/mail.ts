import Error from "next/error"
import nodemailer from "nodemailer"


export async function sendEmail(email:string,subject:string,html?:string){

const transporter = nodemailer.createTransport({
    host:process.env.MAILTRAP_SMTP_HOST as string,
    port:parseInt(process.env.MAILTRAP_SMTP_PORT as string),
    auth:{
        user:process.env.MAILTRAP_SMTP_USER as string,
        pass:process.env.MAILTRAP_SMTP_PASS as string
    }
})

try{
    const mailRes =await transporter.sendMail({
        from:'"New Application 🚀" <no-reply@gmail.com>',
        to:email,
        subject,
        html
    })
    return mailRes
}catch(error:any){
    console.log(error)
    throw error
}

}

