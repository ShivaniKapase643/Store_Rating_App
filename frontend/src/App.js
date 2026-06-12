import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

import AdminUsers from "./pages/AdminUsers";
import AdminStores from "./pages/AdminStores";
import UserDetails from "./pages/UserDetails";

import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";

import ChangePassword from "./pages/ChangePassword";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin-stores"
          element={<AdminStores />}
        />

        <Route
          path="/add-user"
          element={<AddUser />}
        />

        <Route
          path="/add-store"
          element={<AddStore />}
        />

        <Route
          path="/admin/user/:id"
          element={<UserDetails />}
        />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

        <Route
          path="/owner"
          element={<OwnerDashboard />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;