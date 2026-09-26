import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const {login, loading} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        const result = await login(email, password)

        if (!result.success) {
            setError(result.message)
            return
        }

        navigate('/')
    }

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome back</h2>
                <p>Sign in to continue to your projects.</p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Link to={'/forgot-password'}>
                    <p className="forgot-link">Forgot Password?</p>
                </Link>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in ...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login