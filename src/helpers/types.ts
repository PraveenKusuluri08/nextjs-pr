import {NextApiRequest} from "next"


export interface UserSignUpApiRequestBody extends NextApiRequest {
    body:{
        firstName:string;
        lastName:string;
        email:string;
        password:string;
    };
}