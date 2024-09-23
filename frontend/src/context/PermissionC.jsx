import { createContext } from "react";

export const PermissionContext = createContext([]);
export const PermissionProvider = (props)=>{
    return(
        <PermissionContext.Provider>
            {props.children}
        </PermissionContext.Provider>
    )
}