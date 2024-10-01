import { createContext, useEffect, useState } from "react";
import { checkLogin } from "../../Api/Api";
export const LoginContext = createContext(null);
export const LoginProvider = (props) => {
    const [login,setLogin] = useState(null);
    const [cpermissions,setCPermissions] = useState([]);
    const [uid,setUid] = useState(null);
    const [roleId,setRoleId] = useState(null);
    const [userName,setUserName] = useState("");
    const fetchLoginData = async () => {
        const response = await checkLogin();
        // setCPermissions(response.permissions);
    };
    useEffect(() => {
        fetchLoginData();
    }, [])
    useEffect(() => {
        if (login !== null) {
            fetchLoginData();
        }
    }, [login]);
    return(
        <LoginContext.Provider value={{login,setLogin,cpermissions,setCPermissions,uid,setUid,roleId,setRoleId,userName,setUserName}}>
            {props.children}
        </LoginContext.Provider>
    )
}
