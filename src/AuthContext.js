import React, { createContext, useContext, useState } from 'react';
// import variables from "./Environment/env.json"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: process.env.REACT_APP_CBS_TOKEN,
        apiKey: process.env.REACT_APP_CBS_APIKEY,
        userToken: "",
        adminUserName: process.env.REACT_APP_CBS_USER_NAME,
        adminPassword: process.env.REACT_APP_CBS_PASSWORD,
        server: "https://server.claritybusinesssolutions.ca:4343",
        errorMessage: null, // For storing login errors
    });

    const logIn = async (formData) => {
        console.log("login called")
        const requestData = {
            username: formData.email,
            password: formData.password,
            apiKey: authState.apiKey,
        };
        //console.log("requestData: ",requestData)
        //console.log("serverURL: ",variables.server)

        try {
            const response = await fetch(`${authState.server}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                // If the response is not ok, throwing an error to be caught by the catch block
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log("Login success");
            return responseData
        } catch (error) {
            console.error("Login failed: ", error);
            // Update state with error message
            setAuthState(prevState => ({
                ...prevState,
                errorMessage: error.message,
            }));
        }
    }



    const createAuthUser = async (formData) => {
        console.log('creatingAuthUser')
        const data = {
            accessLevel: "Standard",
            newUserName: formData.email,
            newPassword: formData.password,
        };

        try {        
            const response = await fetch(`https://server.claritybusinesssolutions.ca:4343/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authState.token,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('User Created:', responseData);

            // Update state with the login data
            setAuthState(prevState => ({
                ...prevState,
                userToken: responseData.token,
            }));
            return true; // Indicates success

        } catch (error) {
            console.error('Create User Error:', error);
            setAuthState(prevState => ({
                ...prevState,
                errorMessage: error.message,
            }));
            return false;
        }
    };

    // You can also define logOut, createUser, etc., here

    return (
        <AuthContext.Provider value={{ authState, setAuthState, logIn, createAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};