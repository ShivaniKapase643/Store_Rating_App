import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function UserDashboard() {

    const [stores, setStores] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {

        try {

            const res = await fetch(
                `${baseUrl}/api/user/stores`,
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            setStores(data);

        } catch {

            alert("Failed to load stores");

        }

    };

    const searchStore = async () => {

        try {

            const res = await fetch(
                `${baseUrl}/api/user/stores?name=${search}`,
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            setStores(data);

        } catch {

            alert("Search failed");

        }

    };

    const rateStore = async (
        storeId,
        rating,
        userRating
    ) => {

        try {

            let url =
                `${baseUrl}/api/user/rating`;

            let method =
                "POST";

            let bodyData = {};

            if (userRating) {

                url =
                    `${baseUrl}/api/user/rating/${storeId}`;

                method =
                    "PUT";

                bodyData = {
                    rating
                };

            } else {

                bodyData = {
                    store_id: storeId,
                    rating
                };

            }

            const res = await fetch(
                url,
                {
                    method,
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        bodyData
                    )
                }
            );

            const data =
                await res.json();

            alert(data.message);

            loadStores();

        } catch {

            alert("Unable to submit rating");

        }

    };

    return (

        <>
            <Navbar />

            <div className="page">

                <div className="box">

                    <h2>
                        Stores
                    </h2>

                    <div className="search">

                        <input
                            type="text"
                            placeholder="Search Store"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={
                                searchStore
                            }
                        >
                            Search
                        </button>

                        <button
                            onClick={
                                loadStores
                            }
                        >
                            Reset
                        </button>

                    </div>

                    <table className="table">

                        <thead>

                            <tr>

                                <th>
                                    Store Name
                                </th>

                                <th>
                                    Address
                                </th>

                                <th>
                                    Overall Rating
                                </th>

                                <th>
                                    Your Rating
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                stores.map(
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
                                                    item.address
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.overall_rating || 0
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.user_rating ||
                                                    "Not Rated"
                                                }
                                            </td>

                                            <td>

                                                {
                                                    [1, 2, 3, 4, 5].map(
                                                        n => (

                                                            <button
                                                                key={n}
                                                                onClick={() =>
                                                                    rateStore(
                                                                        item.id,
                                                                        n,
                                                                        item.user_rating
                                                                    )
                                                                }
                                                            >
                                                                {n}
                                                            </button>

                                                        )
                                                    )
                                                }

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default UserDashboard;