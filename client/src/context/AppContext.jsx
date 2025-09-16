import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY || "$";

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [cars, setCars] = useState([]);

    // Fetch user data
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                setUser(null); // added
                setIsOwner(false); // added
                navigate('/');
            }
        } catch (error) {
            toast.error('Failed to fetch user data');
        }
    };

    // Fetch cars
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/car');
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Logout
    const logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '';
        toast.success('Logged out successfully');
        navigate('/');
    };

    // On mount: load token and fetch cars
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            axios.defaults.headers.common['Authorization'] = savedToken; // fixed
            fetchUser(); // fetch user immediately
        }
        fetchCars();
    }, []);

    // Watch token change
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token; // fixed
            fetchUser();
        }
    }, [token]);

    const value = {
        navigate,
        currency,
        axios,
        token,
        user,
        isOwner,
        showLogin,
        setShowLogin,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        cars,
        fetchCars,
        logout,
        setToken,
        setUser,
        setIsOwner,
        fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);