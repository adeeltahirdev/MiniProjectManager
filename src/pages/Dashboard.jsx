import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const {user, login, logout} = useAuth()

    return(
        <>
            <h1>Dashboard {user ? user.username : 'Guest'}</h1>

            <button onClick={() => login('Adeel')}>Login</button>

            <button onClick={logout}>Logout</button>
        </>
        
    );
}

export default Dashboard