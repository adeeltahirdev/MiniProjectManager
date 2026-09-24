import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {

    const {loading, forgotPassword} = useAuth()

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setSuccess('')
        setEmail('')

        const result = await forgotPassword(email)

        if (email.trim() === '') {
            setError('Email is required')
            return
        }

        if (!result.success) {
            setError(result.message)
            return
        }
        else {
            setSuccess(result.message)
        }

    }

    return(
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Forgot Your Password</h2>
                <p>Enter your email to verify yourself.</p>

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

                {error && <p className="error-message">{error}</p>}

                {success && <p className="success-message">{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword