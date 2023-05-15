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

export const createUser = async (req: any, res: any) => {
  try {
    const { username, password, email, birthday } = req.body;

    const userDB = await UserModel.create({
      username,
      password,
      email,
      birthday,
    });

    res.status(201).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: Error.Messages });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }


    const userDB = await UserModel.findOne({ email, password });

    if (!userDB) throw new Error("Username or password are incorrect");

    if (!secret) throw new Error("Missing jwt secret");

    const token = jwt.encode({ userId: userDB._id }, secret);

    res.cookie("user", token, { httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
export const deleteUser = async (res: any, req: any) => {
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


export const getUserById  = async (req: any, res: any) => {
  try {
    const { user } = req.cookies;
    if (!secret) throw new Error("No secret");
    
    const decoded = jwt.decode(user, secret);
    
    const { userId } = decoded;

    const userDB = await UserModel.findById(userId);

    res.send({ ok: true, user: userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};


export const updateUserName = async (req: any, res: any) => {
  try {
    const { userId, username, email } = req.query;
    const userDB = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { username , email }
    );
    res.status(201).send({ ok: true, userDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({Error: Error.Messages})
  }
};