import { useState } from "react";
import userContext from "../Context/context";

export function ContextWrapper ({children}) {

    const [userData, setUserData] = useState({});
    const login = (data, token) =>{
        setUserData(data);
        sessionStorage.setItem("User", JSON.stringify(data));
        sessionStorage.setItem("Token", token);
    }

    const clearData = () => {
        setUserData({})
    }

    const logout = (move)=> {
        clearData();
        console.log(userData);
        sessionStorage.clear();
        move();
    }

    return (
        <userContext.Provider value={{userData, login, logout}}>
            {children}
        </userContext.Provider>
    )

}
