import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../services/api";

function Navbar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role");

    const logout = async () => {

        try {

            await fetch(
                `${baseUrl}/api/auth/logout`,
                {
                    credentials: "include"
                }
            );

        }
        catch (err) {
        }

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="navbar">

            <h2>
                Store Rating
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center"
                }}
            >

                {
                    role === "admin" &&

                    <>

                        <Link
                            to="/admin"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin-users"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Users
                        </Link>

                        <Link
                            to="/admin-stores"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Stores
                        </Link>

                        <Link
                            to="/add-user"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Add User
                        </Link>

                        <Link
                            to="/add-store"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Add Store
                        </Link>

                    </>

                }

                {
                    role === "user" &&

                    <>

                        <Link
                            to="/user"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Stores
                        </Link>

                        <Link
                            to="/change-password"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Change Password
                        </Link>

                    </>

                }

                {
                    role === "owner" &&

                    <>

                        <Link
                            to="/owner"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/change-password"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Change Password
                        </Link>

                    </>

                }

                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;