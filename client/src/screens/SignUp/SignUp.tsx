import "./signup.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { RegisterData, register as registerService } from "../../service/authService";
import { useNavigate } from "react-router-dom";


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
    <div className="container-signup">
      <div className="content-section-form">
        <div className="section-title">
          <h1>Welcome</h1>
        </div>
        <div className="section-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
            <button type="submit">Sign Up</button>
          </form>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
        <div className="section-action-account">
          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
      <div className="content-section-graph">   
      </div>
    </div>
  );
}

export default SignUp;
