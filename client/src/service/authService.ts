import { apiConfig } from "../config/api";


export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export const login = async (formData: LoginData): Promise<LoginResponse> => {
    const response = await fetch(`${apiConfig.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed");
    }

    console.log(response);

    const data = await response.json();
    return data;
};