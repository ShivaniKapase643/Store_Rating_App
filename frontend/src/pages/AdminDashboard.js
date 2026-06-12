import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function AdminDashboard() {

    const [data, setData] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await fetch(
                `${baseUrl}/api/admin/dashboard`,
                {
                    credentials: "include"
                }
            );

            const result =
            await res.json();

            setData(result);

        } catch {

            alert(
                "Failed to load dashboard"
            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="box">

                    <h2>
                        Admin Dashboard
                    </h2>

                    <h3>
                        Total Users :
                        {" "}
                        {data.totalUsers}
                    </h3>

                    <h3>
                        Total Stores :
                        {" "}
                        {data.totalStores}
                    </h3>

                    <h3>
                        Total Ratings :
                        {" "}
                        {data.totalRatings}
                    </h3>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;