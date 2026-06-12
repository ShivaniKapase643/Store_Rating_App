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

import ProtectedRoute from "./components/ProtectedRoute";

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
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-stores"
          element={
            <ProtectedRoute role="admin">
              <AdminStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <ProtectedRoute role="admin">
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-store"
          element={
            <ProtectedRoute role="admin">
              <AddStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-details/:id"
          element={
            <ProtectedRoute role="admin">
              <UserDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;