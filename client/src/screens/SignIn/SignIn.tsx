import "./signin.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login as loginService, LoginData } from "../../service/authService";


function SignIn() {
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginService(formData);
            localStorage.setItem("authToken", data.token);
            console.log(data.token);

            login();
            navigate("/home");
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        <div className="container-signin">
            <div className="content-section-form">
                <div className="section-title">
                    <h1>Welcome</h1>
                </div>
                <div className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="signin-email">E-mail</label>
                            <input
                                id="signin-email"
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signin-password">Password</label>
                            <input
                                id="signin-password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>
                <div className="section-action-account">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
