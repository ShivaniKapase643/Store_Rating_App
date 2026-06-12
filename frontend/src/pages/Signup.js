import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../services/api";

function Signup() {

    const navigate =
    useNavigate();

    const [form, setForm] =
    useState({
        name: "",
        email: "",
        password: "",
        address: ""
    });

    const handleChange =
    (e) => {

        setForm({
            ...form,
            [e.target.name]:
            e.target.value
        });

    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.address
        ) {

            alert(
                "All fields are required"
            );

            return;

        }

        if (
            form.name.length < 20 ||
            form.name.length > 60
        ) {

            alert(
                "Name must be between 20 and 60 characters"
            );

            return;

        }

        if (
            form.address.length > 400
        ) {

            alert(
                "Address cannot exceed 400 characters"
            );

            return;

        }

        const emailCheck =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailCheck.test(
                form.email
            )
        ) {

            alert(
                "Invalid Email"
            );

            return;

        }

        const passCheck =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

        if (
            !passCheck.test(
                form.password
            )
        ) {

            alert(
                "Password must be 8-16 characters and contain one uppercase letter and one special character"
            );

            return;

        }

        try {

            const res =
            await fetch(
                `${baseUrl}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                    JSON.stringify(
                        form
                    )
                }
            );

            const data =
            await res.json();

            if (!res.ok) {

                alert(
                    data.message
                );

                return;

            }

            alert(
                "Account Created Successfully"
            );

            navigate("/");

        }
        catch {

            alert(
                "Server Error"
            );

        }

    };

    return (

        <div className="container">

            <div className="card">

                <h2>
                    Signup
                </h2>

                <form
                onSubmit={
                    handleSubmit
                }
                >

                    <input
                    type="text"
                    name="name"
                    value={
                        form.name
                    }
                    placeholder="Full Name"
                    onChange={
                        handleChange
                    }
                    />

                    <input
                    type="email"
                    name="email"
                    value={
                        form.email
                    }
                    placeholder="Email"
                    onChange={
                        handleChange
                    }
                    />

                    <input
                    type="text"
                    name="address"
                    value={
                        form.address
                    }
                    placeholder="Address"
                    onChange={
                        handleChange
                    }
                    />

                    <input
                    type="password"
                    name="password"
                    value={
                        form.password
                    }
                    placeholder="Password"
                    onChange={
                        handleChange
                    }
                    />

                    <button>
                        Signup
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Signup;