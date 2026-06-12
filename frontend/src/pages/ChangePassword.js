import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function ChangePassword() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const role =
            localStorage.getItem("role");

        let url = "";

        if (role === "user") {
            url =
            `${baseUrl}/api/user/change-password`;
        }

        if (role === "owner") {
            url =
            `${baseUrl}/api/owner/change-password`;
        }

        try {

            const res =
            await fetch(url, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body:
                JSON.stringify(form)
            });

            const data =
            await res.json();

            alert(data.message);

            if (res.ok) {
                navigate("/");
            }

        }
        catch {

            alert("Server Error");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>
                        Change Password
                    </h2>

                    <form
                    onSubmit={
                        handleSubmit
                    }
                    >

                        <input
                        type="password"
                        name="oldPassword"
                        placeholder=
                        "Old Password"
                        onChange={
                        handleChange
                        }
                        />

                        <input
                        type="password"
                        name="newPassword"
                        placeholder=
                        "New Password"
                        onChange={
                        handleChange
                        }
                        />

                        <button>
                            Update
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default ChangePassword;