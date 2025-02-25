import { apiConfig } from "../config/api";


interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token: string;
}

const login = async (formData: LoginData): Promise<LoginResponse> => {
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

const register = async (formData: LoginData) => {
    const response = await fetch(`${apiConfig.baseUrl}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
};


export { login, register };
export type { LoginData, LoginResponse, RegisterData };