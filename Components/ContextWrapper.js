import { useState } from "react";
import userContext from "../Context/context";
import { GetUserData } from "../src/auth/fetchUser";

export function ContextWrapper ({children}) {

    const [userData, setUserData] = useState({});
    const login = (data, dataTwo, token) =>{
        sessionStorage.setItem("User", JSON.stringify(data));
        sessionStorage.setItem("Token", token);
        GetUserData(data);
        setUserData(dataTwo);
        console.log(dataTwo);
    }

    const clearData = () => {
        setUserData({})
    }


    const logout = (goHome)=> {
        goHome;
        clearData();
        console.log(userData);
        sessionStorage.clear();
    }

    return (
        <userContext.Provider value={{userData, login, logout, setUserData}}>
            {children}
        </userContext.Provider>
    )

}
