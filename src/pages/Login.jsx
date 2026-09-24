function Login() {

    return (
        <div className="container">
            <form className="login-form">
                <h2>Welcome back</h2>
                <p>Sign in to continue to your projects.</p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login