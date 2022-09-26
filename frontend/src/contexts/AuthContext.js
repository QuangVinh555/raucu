import {createContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { LOCAL_STORAGE_TOKEN_NAME } from '../localStorage/localStorage';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthLoading: true,
        isAuthenticated: false,
        user: null
    });

    const getUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get("http://localhost:8000/user/");
            if(response.data.success){
                dispatch({
                    
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const loginUser = async (user) => {
        try {
            const response = await axios.post("http://localhost:8000/user/login", user);
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const registerUser = async (user) => {
        try {
            const response = await axios.post("http://localhost:8000/user/register", user)
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logOutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: {isAuthenticated: false, user: null}
        })
    }



    const AuthContextData = {
        loginUser,
        registerUser,
        authState,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;