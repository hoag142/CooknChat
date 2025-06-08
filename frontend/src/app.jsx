// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

const App = () => {
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Add more routes here */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <div>Home Page (Coming soon)</div>
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
};

export default App;