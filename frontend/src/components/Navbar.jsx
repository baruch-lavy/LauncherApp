import { useNavigate } from "react-router"

export function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <ul>
                <li on onClick={() => navigate('/register-page')}>Register Page</li>
                <li on onClick={() => navigate('/login-page')}>Login Page</li>
                <li>Home Page</li>
                <li>Add Launcher</li>
            </ul>
        </div>
    )
}