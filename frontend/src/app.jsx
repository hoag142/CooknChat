// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './components/homepage/homepage';

// Placeholder cho các trang chưa tạo
const PlaceholderPage = ({ name }) => (
    <div style={{ padding: '20px', minHeight: '400px' }}>
        <h2>{name} Page</h2>
        <p>This page is under development.</p>
    </div>
);

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
                {/* Auth routes outside MainLayout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes with MainLayout */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<PlaceholderPage name="About" />} />

                    {/* Protected routes */}
                    <Route path="recipes" element={
                        <ProtectedRoute>
                            <PlaceholderPage name="Recipes" />
                        </ProtectedRoute>
                    } />
                    <Route path="chat" element={
                        <ProtectedRoute>
                            <PlaceholderPage name="Chat" />
                        </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <PlaceholderPage name="Profile" />
                        </ProtectedRoute>
                    } />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default App;