
export const validateEmail =(email:string)=>{
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    if(!regex.test(email)){
        return "Invalid Email"
    }
}

export const validatePassword =(password:string)=>{
    const regex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/
    if(!regex.test(password)){
        return {
            message:"Password must match these requirements "
        }
    }
}