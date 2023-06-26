import { BsFillChatLeftQuoteFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'
const Navbar = () => {

    const token = localStorage.getItem('token');
    return (
        <nav
            style={{
                position: "sticky", top: "0", zIndex: "1000",
            }}
        >
            <div
                style={{
                    backgroundColor: "#111827", paddingLeft: "1rem", paddingRight: '1rem',
                }}
                className="nav-wrapper"
            >
                <Link to="/" className="left"
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center", height: "100%",
                    }}
                >
                    <BsFillChatLeftQuoteFill
                        style={{ fontSize: "2.5rem", color: "white" }}
                    />
                </Link>
                <ul id="nav-mobile" className="right">
                    {
                        token ? (
                            <>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/create">Create</Link></li>
                                <li><button
                                    className="red btn-small"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.reload();
                                    }}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Signup</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
