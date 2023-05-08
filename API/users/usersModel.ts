import express from "express";
import mongoose, {Schema} from "mongoose";


interface User{
        username: string,
        password: string,
        email: string,
        birthday: Date,

}

export const UserSchema= new Schema({
    username: {require: true, type:String},
    password: {require: true, type:String},
    email: {require:true, type:String},
    birthday: {require:true, type:Date}
})

const UserModel = mongoose.model("users",UserSchema);

export default UserModel;