import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function UserDetails() {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        const res = await fetch(
            `${baseUrl}/api/admin/user/${id}`,
            {
                credentials: "include"
            }
        );

        const data = await res.json();

        setUser(data);
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (

        <>
            <Navbar />

            <div className="page">

                <div className="box">

                    <h2>User Details</h2>

                    <p>
                        <b>Name:</b>
                        {" "}
                        {user.name}
                    </p>

                    <p>
                        <b>Email:</b>
                        {" "}
                        {user.email}
                    </p>

                    <p>
                        <b>Address:</b>
                        {" "}
                        {user.address}
                    </p>

                    <p>
                        <b>Role:</b>
                        {" "}
                        {user.role}
                    </p>

                    {
                        user.role === "owner" &&

                        <p>
                            <b>Rating:</b>
                            {" "}
                            {
                                user.rating ||
                                0
                            }
                        </p>
                    }

                </div>

            </div>

        </>
    );
}

export default UserDetails;