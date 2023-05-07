import UserModel from "./usersModel";
import jwt from "jwt-simple";
import { Error } from "mongoose";
const secret = process.env.JWT_SECRET;

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await UserModel.find({});
    res.send({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: Error.Messages });
  }
};

export const addUser = async (req: any, res: any) => {
  try {
    const { userName, password, email, birthDay } = req.body;
    console.log(userName, password, email, birthDay);

    const userDB = await UserModel.create({
      userName,
      password,
      email,
      birthDay,
    });
    console.log(userDB);

    res.status(201).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: Error.Messages });
  }
};

export const login = async (req:any,res:any)=>{
    try {
       const {password, email} = req.body;
       console.log(password,email);
       const userDB = await UserModel.findOne({email,password});
       if(!userDB){
        return res.status(401).json({ message: "Email or password are not correct" });
       };
       res.status(201).send({ ok: true, userDB });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ Error: Error.Messages });
       
    }
};

export const deleteUser = async (res:any,req:any)=>{
    try {
        const { _id } = req.body;
        const deleteUser = await UserModel.deleteOne({ _id });
        const users = await UserModel.find({});
        res.status(201).send({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ Error: Error.Messages });
   
    }
};

