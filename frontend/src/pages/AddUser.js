import { useState } from "react";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function AddUser() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user"
    });

    const change = (e) => {

        setForm({
            ...form,
            [e.target.name]:
            e.target.value
        });

    };

    const submit = async (e) => {

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
                `${baseUrl}/api/admin/add-user`,
                {
                    method: "POST",
                    credentials:
                    "include",
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

            alert(
                data.message
            );

            if (res.ok) {

                setForm({
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    role: "user"
                });

            }

        } catch {

            alert(
                "Server Error"
            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>
                        Add User
                    </h2>

                    <form
                    onSubmit={
                        submit
                    }
                    >

                        <input
                        name="name"
                        value={
                            form.name
                        }
                        placeholder="Name"
                        onChange={
                            change
                        }
                        />

                        <input
                        name="email"
                        value={
                            form.email
                        }
                        placeholder="Email"
                        onChange={
                            change
                        }
                        />

                        <input
                        name="address"
                        value={
                            form.address
                        }
                        placeholder="Address"
                        onChange={
                            change
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
                            change
                        }
                        />

                        <select
                        name="role"
                        value={
                            form.role
                        }
                        onChange={
                            change
                        }
                        >

                            <option value="user">
                                User
                            </option>

                            <option value="owner">
                                Owner
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>

                        <button>
                            Save
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default AddUser;