import { createContext, useEffect, useState } from "react";
import { checkLogin } from "../../Api/Api";
export const LoginContext = createContext(null);
export const LoginProvider = (props) => {
    const [login,setLogin] = useState(null);
    const [cpermissions,setCPermissions] = useState([]);
    const [uid,setUid] = useState(null);
    const fetchLoginData = async () => {
        const response = await checkLogin();
        if (response.valid){
            setLogin(true);
            setUid(response.id);
        } 
        else setLogin(false);
        setCPermissions(response.permissions);
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
        <LoginContext.Provider value={{login,setLogin,cpermissions,setCPermissions,uid}}>
            {props.children}
        </LoginContext.Provider>
    )
}