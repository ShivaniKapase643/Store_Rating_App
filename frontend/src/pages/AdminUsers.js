import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import baseUrl from "../services/api";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [filter, setFilter] = useState({
        name: "",
        email: "",
        address: "",
        role: ""
    });

    const [sort, setSort] = useState("name");

    const [order, setOrder] = useState("asc");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const query = new URLSearchParams({
                name: filter.name,
                email: filter.email,
                address: filter.address,
                role: filter.role,
                sort,
                order
            });

            const res = await fetch(
                `${baseUrl}/api/admin/users?${query.toString()}`,
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            console.log(data);

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
                alert(data.message || "Failed to load users");
            }

        } catch {

            alert("Failed to load users");

        }

    };

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="box">

                    <h2>
                        Users
                    </h2>

                    <div className="search">

                        <input
                            placeholder="Name"
                            value={filter.name}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Email"
                            value={filter.email}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    email: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Address"
                            value={filter.address}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    address: e.target.value
                                })
                            }
                        />

                        <select
                            value={filter.role}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    role: e.target.value
                                })
                            }
                        >
                            <option value="">
                                All Roles
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                            <option value="user">
                                User
                            </option>

                            <option value="owner">
                                Owner
                            </option>

                        </select>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(
                                    e.target.value
                                )
                            }
                        >
                            <option value="name">
                                Sort By Name
                            </option>

                            <option value="email">
                                Sort By Email
                            </option>

                        </select>

                        <select
                            value={order}
                            onChange={(e) =>
                                setOrder(
                                    e.target.value
                                )
                            }
                        >
                            <option value="asc">
                                Ascending
                            </option>

                            <option value="desc">
                                Descending
                            </option>

                        </select>

                        <button
                            onClick={loadUsers}
                        >
                            Search
                        </button>

                    </div>

                    <table className="table">

                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Address
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users.length > 0 ? (

                                    users.map((item) => (

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
                                                {item.role}
                                            </td>

                                            <td>

                                                <Link
                                                    to={`/admin/user/${item.id}`}
                                                >
                                                    View
                                                </Link>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            style={{
                                                textAlign:
                                                    "center"
                                            }}
                                        >
                                            No Users Found
                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default AdminUsers;