import { User, IUser } from '../models/User.model';
import type { CreateUserDTO } from '../types/user'


export const getAllUsers = async (): Promise<IUser[]> => {
    return User.find();
};

export const createUser = async (userData: CreateUserDTO): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};
