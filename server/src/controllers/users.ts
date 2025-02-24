import { ModelStatic } from "sequelize";
import UserModel from "../models/user";

interface IUserDTO {
    name: string;
    email: string;
    password: string;
}

interface IUserAuth {
    id?: string;
    name?: string;
    email: string;
    password?: string;
}

interface IUpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

class User {
    private user: ModelStatic<UserModel>;

    constructor(userModel: ModelStatic<UserModel>) {
        this.user = userModel;
    }

    async createUser(userDTO: IUserDTO) {
        const { name, email, password } = userDTO;

        if (!name || !email || !password) return { status: 400, message: "Missing required fields"};

        const existingUser = await this.user.findOne({ where: { email } });

        if (existingUser) return { status: 400, message: "User with this email already exists"};

        try {
            const newUser = await this.user.create({ 
                name, 
                email, 
                password,
            });

            return { status: 201, message: "User created successfully", data: newUser };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getUser() {
        try {
            const users = await this.user.findAll({
                attributes: { exclude: ['password'] },
            });

            return { status: 200, message: "Users retrieved successfully", data: users };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.user.findOne({
                where: { id: userId },
                attributes: { exclude: ['password'] },
            });

            if (!user) return { status: 404, message: "User not found", data: null }

            return { status: 200, message: "User retrieved successfully", data: user }
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            const user = await this.user.findOne({
                where: { email: userEmail},
                attributes: { exclude: ['password'] },
            });

            if (!user) return { status: 404, message: "User not found", data: null };

            return { status: 200, message: "User retrieved successfully", data: user };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async updateUser(userAuth: IUserAuth, updates: IUpdateUser) {
        try {
            const user = (await this.getUserByEmail(userAuth.email)).data;

            if (!user) return { status: 404, message: "User not found" };

            await user.update(updates);

            return { status: 200, message: "User updated successfully", data: user };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async updatehUserByEmail(userEmail: string, updates: IUpdateUser) {
        try {
            const user = (await this.getUserByEmail(userEmail)).data;

            if (!user) return { status: 404, message: "User not found" };

            await user.update(updates);

            return { status: 200, message: "User updated successfully", data: user };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async deleteUser(userAuth: IUserAuth) {
        try {
            const user = (await this.getUserByEmail(userAuth.email)).data;

            if (!user) return { status: 404, message: "User not found" };

            await user.destroy();

            return { status: 200, message: "User deleted successfully" };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async deleteUserByEmail(userEmail: string) {
        try {
            const user = (await this.getUserByEmail(userEmail)).data;

            if (!user) return {status: 404, message: "User not found" };

            await user.destroy();

            return { status: 200, message: "User deleted successfully" };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }
}   

export default User;