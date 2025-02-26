import styles from "../SignIn/signin.module.css";
import stylesSigup from "./signup.module.css";
import Logo from "../../../public/banner-sign.svg";
import { useState, ChangeEvent, FormEvent } from "react";
import { RegisterData, register as registerService } from "../../service/authService";
import { useNavigate } from "react-router-dom";

import UserIcon from "../../../public/user-icon.svg";
import EmailIcon from "../../../public/email-icon.svg";
import PasswordIcon from "../../../public/password-icon.svg";


function SignUp() {
    const [formData, setFormData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            await registerService(formData);

            alert("User registered successfully!");
            setFormData({ name: "", email: "", password: "" });
            navigate("/signin");
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        <div className={stylesSigup.containerSignup}>
            <div className={styles.contentSectionForm}>
                <div className={styles.sectionForm}>
                    <h2 className={styles.formTitle}>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <img src={UserIcon} alt="User icon" className={styles.iconsForm}/>
                            <input
                                id="signup-name"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <img src={EmailIcon} alt="Email icon" className={styles.iconsForm}/>
                            <input
                                id="signup-email"
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <img src={PasswordIcon} alt="Password icon" className={styles.iconsForm}/>
                            <input
                                id="signup-password"
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit">Finish</button>
                    </form>
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <div className={styles.sectionActionAccount}>
                        <p>Already have an account? <a href="/signin" className={stylesSigup.signInLink}>Sign In</a></p>
                    </div>
                </div>
                <div className={styles.sectionBanner}>
                    <img src={Logo} alt="Logo" className={styles.Banner} />
                </div>
            </div>
            <div className="content-section-graph">
            </div>
        </div>
    );
}

export default SignUp;
