import express from "express";
import mongoose, {Schema} from "mongoose";


interface User{
        userName: string,
        password: string,
        email: string,
        birthDay: Date,

}

export const UserSchema= new Schema({
    userName: {require: true, type:String},
    password: {require: true, type:String},
    email: {require:true, type:String},
    birthDay: {require:true, type:Date}
})

const UserModel = mongoose.model("users",UserSchema);

export default UserModel;