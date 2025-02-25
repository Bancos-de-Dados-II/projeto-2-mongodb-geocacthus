import { apiConfig } from "../config/api";


interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
    const response = await fetch(`${apiConfig.baseUrl}/users/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user");
    }

    const data = await response.json();
    return data.data;
};


export { getUserById };
export type { IUser };