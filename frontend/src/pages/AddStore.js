import { useState } from "react";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function AddStore() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: ""
    });

    const change = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const submit = async (e) => {

        e.preventDefault();

        if (
            !form.name ||
            !form.email ||
            !form.address ||
            !form.owner_id
        ) {

            alert(
                "All fields are required"
            );

            return;

        }

        if (
            form.address.length > 400
        ) {

            alert(
                "Address is too long"
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

        try {

            const res =
            await fetch(
                `${baseUrl}/api/admin/add-store`,
                {
                    method: "POST",
                    credentials: "include",
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
                    address: "",
                    owner_id: ""
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
                        Add Store
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
                        placeholder=
                        "Store Name"
                        onChange={
                            change
                        }
                        />

                        <input
                        name="email"
                        value={
                            form.email
                        }
                        placeholder=
                        "Store Email"
                        onChange={
                            change
                        }
                        />

                        <input
                        name="address"
                        value={
                            form.address
                        }
                        placeholder=
                        "Address"
                        onChange={
                            change
                        }
                        />

                        <input
                        name="owner_id"
                        value={
                            form.owner_id
                        }
                        placeholder=
                        "Owner Id"
                        onChange={
                            change
                        }
                        />

                        <button>
                            Save
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default AddStore;