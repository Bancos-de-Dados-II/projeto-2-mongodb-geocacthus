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
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" fill="#000000" r="4" className="fill-464646 fill-ffffff"></circle>
                <path d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6Z" fill="#000000" className="fill-464646 fill-ffffff"></path>
              </svg>
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
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M67,148.7c11,5.8,163.8,89.1,169.5,92.1c5.7,3,11.5,4.4,20.5,4.4c9,0,14.8-1.4,20.5-4.4c5.7-3,158.5-86.3,169.5-92.1   c4.1-2.1,11-5.9,12.5-10.2c2.6-7.6-0.2-10.5-11.3-10.5H257H65.8c-11.1,0-13.9,3-11.3,10.5C56,142.9,62.9,146.6,67,148.7z"/>
                  <path d="M455.7,153.2c-8.2,4.2-81.8,56.6-130.5,88.1l82.2,92.5c2,2,2.9,4.4,1.8,5.6c-1.2,1.1-3.8,0.5-5.9-1.4l-98.6-83.2   c-14.9,9.6-25.4,16.2-27.2,17.2c-7.7,3.9-13.1,4.4-20.5,4.4c-7.4,0-12.8-0.5-20.5-4.4c-1.9-1-12.3-7.6-27.2-17.2l-98.6,83.2   c-2,2-4.7,2.6-5.9,1.4c-1.2-1.1-0.3-3.6,1.7-5.6l82.1-92.5c-48.7-31.5-123.1-83.9-131.3-88.1c-8.8-4.5-9.3,0.8-9.3,4.9   c0,4.1,0,205,0,205c0,9.3,13.7,20.9,23.5,20.9H257h185.5c9.8,0,21.5-11.7,21.5-20.9c0,0,0-201,0-205   C464,153.9,464.6,148.7,455.7,153.2z"/>
                </g>
              </svg>
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
              <svg viewBox="0 0 139 139" xmlns="http://www.w3.org/2000/svg">
                <path d="M109.92,59.988c0.426-2.44,0.661-4.95,0.661-7.516c0-23.326-18.429-42.305-41.081-42.305  c-22.653,0-41.083,18.979-41.083,42.305c0,2.566,0.236,5.074,0.663,7.516c-3.567,2.278-5.939,6.261-5.939,10.81v41.415  c0,7.084,5.743,12.826,12.825,12.826h67.067c7.08,0,12.822-5.742,12.822-12.826h0.004V70.798  C115.859,66.25,113.489,62.266,109.92,59.988z M75.159,96.15v9c0,3.128-2.534,5.662-5.661,5.662c-3.127,0-5.661-2.534-5.661-5.662  v-9.004c-3.631-2.001-6.094-5.862-6.094-10.302c0-6.492,5.263-11.756,11.757-11.756c6.494,0,11.758,5.264,11.758,11.756  C81.258,90.286,78.793,94.15,75.159,96.15z M94.95,57.971H44.049c-0.349-1.775-0.535-3.616-0.535-5.499  c0-15.003,11.657-27.208,25.986-27.208c14.328,0,25.984,12.204,25.984,27.208C95.484,54.355,95.3,56.196,94.95,57.971z"/>
              </svg>
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
