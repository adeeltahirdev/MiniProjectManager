import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {

    const {loading, register} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        if (email.trim() === '') {
            setError('Email is required!')
            return
        }
        else if (username.trim() === '') {
            setError('Username is required')
            return
        }
        else if (password.trim() === '') {
            setError('Password is required')
            return
        }
        else if (confirmPassword.trim() === '') {
            setError('Confirming your password is required')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords don\'t match')
            return
        }

        const result = await register(username, email, password)

        if (!result.success) {
            setError(result.message)
            return
        }

        navigate('/')
    }

    return(
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <p>Sign up to continue.</p>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account ...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Register