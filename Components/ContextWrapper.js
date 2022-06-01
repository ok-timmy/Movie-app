import { useState } from "react";
import userContext from "../Context/context";
import { GetUserData } from "../src/auth/fetchUser";

export function ContextWrapper ({children}) {

    const [userData, setUserData] = useState({});
    const [log, setLog] = useState()
    const login = (data, token) =>{
        sessionStorage.setItem("User", JSON.stringify(data));
        sessionStorage.setItem("Token", token);
        GetUserData(data);
        setUserData(data);
    }

    const clearData = () => {
        setUserData({})
    }

    const setData = () => {
        const loggedIn = sessionStorage.getItem("UserDatabase");
        if(loggedIn) {
            const LoggedInUser = JSON.parse(loggedIn);
            setLog(LoggedInUser);
        }
    }

    const logout = (goHome)=> {
        clearData();
        console.log(userData);
        sessionStorage.clear();
        goHome;
    }

    return (
        <userContext.Provider value={{userData, login, logout, setLog, setData, log}}>
            {children}
        </userContext.Provider>
    )

}
