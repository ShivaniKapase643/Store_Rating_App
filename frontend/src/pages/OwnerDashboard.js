import {
useEffect,
useState
}
from "react";

import Navbar
from "../components/Navbar";

import baseUrl
from "../services/api";

function OwnerDashboard() {

    const [data,
    setData] =
    useState({
        averageRating:0,
        users:[]
    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData =
    async () => {

        const res =
        await fetch(
        `${baseUrl}/api/owner/dashboard`,
        {
            credentials:
            "include"
        });

        const result =
        await res.json();

        setData(
        result
        );

    };

    return (

        <>

            <Navbar />

            <div
            className="page"
            >

                <div
                className="box"
                >

                    <h2>
                        Average
                        Rating
                    </h2>

                    <h1>
                    {
                    data
                    .averageRating
                    }
                    </h1>

                </div>

                <div
                className="box"
                >

                    <h3>
                        Users
                    </h3>

                    <table
                    className=
                    "table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Rating
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                        {
                        data.users
                        .map(
                        item => (

                        <tr
                        key={
                        item.id
                        }
                        >

                            <td>
                            {
                            item.name
                            }
                            </td>

                            <td>
                            {
                            item.email
                            }
                            </td>

                            <td>
                            {
                            item.rating
                            }
                            </td>

                        </tr>

                        ))
                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default OwnerDashboard;