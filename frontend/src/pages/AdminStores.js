import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function AdminStores() {

    const [stores, setStores] = useState([]);

    const [name, setName] = useState("");

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {

        const res = await fetch(
            `${baseUrl}/api/admin/stores?name=${name}`,
            {
                credentials: "include"
            }
        );

        const data = await res.json();

        setStores(data);
    };

    return (

        <>
            <Navbar />

            <div className="page">

                <div className="box">

                    <h2>Stores</h2>

                    <div className="search">

                        <input
                            placeholder="Store Name"
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <button
                            onClick={loadStores}
                        >
                            Search
                        </button>

                    </div>

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Rating</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                stores.map(item => (

                                    <tr
                                        key={item.id}
                                    >

                                        <td>
                                            {item.name}
                                        </td>

                                        <td>
                                            {item.email}
                                        </td>

                                        <td>
                                            {item.address}
                                        </td>

                                        <td>
                                            {
                                                item.rating ||
                                                0
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

export default AdminStores;