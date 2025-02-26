import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./header.css";
import ModalCreateLocation from "../Modal/ModalCreateLocation/ModalCreateLocation";


function Header() {
    const { logout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("authToken"); // Certifique-se de que o nome da chave está correto
        setIsLoggedIn(!!userToken);
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false); // Atualiza o estado
        navigate("/home"); // Redireciona para a página inicial
    };

    return (
        <header className="main-header">
            <div className="header-logo">
                <Link to="/home">
                    {isLoggedIn ? (
                        <h1>Agent Map</h1>
                    ) : (
                        <h1>Tourist Map</h1>
                    )}
                </Link>
            </div>
            <nav className="header-nav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li onClick={() => setIsModalOpen(true)}>
                                Create Tourist Location
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li onClick={handleLogout} className="logout-link">
                                Logout
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/signin">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <ModalCreateLocation isOpen={isModalOpen} onClose={setIsModalOpen} />
        </header>
    );
}

export default Header;
