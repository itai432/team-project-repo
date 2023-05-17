import UserModel from "./usersModel";
import  { UserType } from "./usersModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;



export async function isAdmin (req:any,res:any,next:any){
    try {
        const {user}= req.cookies;
        if (!secret) throw new Error("No secret");
       
       const decoded = jwt.decode(user, secret);
       
       const { userId } = decoded;
       const userDB:any = await UserModel.findById(userId);

       const {userType}= userDB;

       if(userType !== UserType.ADMIN){
        throw new Error("user not allow");
    }
    res.status(201).send({ ok: true });
        next();
    } catch (error:any) {
        console.error(error);
        res.status(401).send({ error:error.message });
    }
}