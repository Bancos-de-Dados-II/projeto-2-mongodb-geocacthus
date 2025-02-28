import { createContext } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);