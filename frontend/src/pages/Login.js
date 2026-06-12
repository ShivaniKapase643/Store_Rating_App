import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseUrl from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                `${baseUrl}/api/auth/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem(
                "role",
                data.user.role
            );

            if (
                data.user.role ===
                "admin"
            ) {
                navigate("/admin");
            }

            if (
                data.user.role ===
                "user"
            ) {
                navigate("/user");
            }

            if (
                data.user.role ===
                "owner"
            ) {
                navigate("/owner");
            }

        }
        catch {

            alert(
                "Server error"
            );

        }

    };

    return (

        <div className="container">

            <div className="card">

                <h2>
                    Login
                </h2>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={
                            handleChange
                        }
                    />

                    <button>
                        Login
                    </button>

                </form>

                <p>

                    New User ?

                    <Link
                        to="/signup"
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;