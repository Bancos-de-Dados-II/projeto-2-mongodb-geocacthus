import { Navigate, Route, Routes } from "react-router-dom"

import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";
import Home from "../screens/Home/Home";
import CreateTouristLocation from "../screens/CreateTuristLocation/CreateTouristLocation";
import Profile from "../screens/Profile/Profile";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index
                element={
                    <Navigate to="/signin" />
                }
            />
            <Route
                path="/signin"
                element={<SignIn />}
            />
            <Route
                path="/signup"
                element={<SignUp />}
            />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/create/tourist-place"
                element={
                    <ProtectedRoute>
                        <CreateTouristLocation />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes