import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";

interface User {
    name: string;
    email: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setIsAuthenticated(true);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                setIsAuthenticated(false);
            }
        }

        setIsLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
    };

    console.log(`Loading: ${isLoading}; Authenticated: ${isAuthenticated}`);

    if (isLoading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}