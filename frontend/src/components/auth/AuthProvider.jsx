import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const AuthProvider = ({ children }) => {
    const { token, fetchUserProfile } = useAuthStore();

    useEffect(() => {
        if (token) {
            fetchUserProfile().catch(() => {
                // Token expired or invalid
                console.log('Token expired or invalid');
            });
        }
    }, [token, fetchUserProfile]);

    return children;
};

export default AuthProvider;