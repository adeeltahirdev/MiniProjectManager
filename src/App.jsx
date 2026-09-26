import { Link } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext";

function App() {

  const {user, logout} = useAuth()

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="landing-brand">
          <div className="landing-logo">PM</div>
          <span>Project Manager</span>
        </div>

        {user ? (
          <div className="landing-links">
            <p className="landing-link">{user.username}</p>
            <button onClick={logout} className="landing-cta">
              Logout
            </button>
          </div>
        ) : (
          <nav className="landing-links">
          <Link to="/login" className="landing-link">Sign in</Link>
          <Link to="/register" className="landing-cta">Get started</Link>
        </nav>
        )}
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <h1>Plan projects. Track tasks. Ship on time.</h1>
          <p>
            A simple workspace for small teams — create projects, assign
            tasks, and see what's due without juggling spreadsheets.
          </p>

          {user ? (
            <div className="landing-actions">
              <Link to={'/dashboard'} className="landing-primary">
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="landing-actions">
            <Link to="/register" className="landing-primary">
              Create an account
            </Link>
            <Link to="/login" className="landing-secondary">
              I already have one
            </Link>
          </div>
          )}
        </section>

        <section className="landing-features">
          <div className="landing-feature">
            <h3>Projects</h3>
            <p>Group work into clear, focused projects with owners and due dates.</p>
          </div>

          <div className="landing-feature">
            <h3>Tasks</h3>
            <p>Assign, prioritize, and move tasks through todo, in-progress, and done.</p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>© {new Date().getFullYear()} Project Hub</span>
      </footer>
    </div>
  );
}

export default App