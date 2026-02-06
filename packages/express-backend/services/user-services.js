import User from "../models/user.js";

export const getUsers = () => User.find();

export const findUserByName = (name) => User.find({ name });

export const findUserByJob = (job) => User.find({ job });

export const findUsersByNameAndJob = (name, job) => User.find({ name, job });

export const findUserById = (id) => User.findById(id);

export const addUser = (user) => User.create(user);

export const deleteUserById = (id) => User.findByIdAndDelete(id);
