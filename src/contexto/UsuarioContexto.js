import { createContext, useContext, useState } from "react";
import { supabase } from '../config/supabase';


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    // informa ao db que a sessãofoi encerrada
    const logout = async () => {
        await supabase.auth.signOut();

        setUser(null);
        setProfile(null);
    }

    // verifica o tipo de usuário

    const isAdm = () => {
        if(profile){
            if(profile.tipo === "adm"){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return empty;
        }
    }

    return (
        <UserContext.Provider
            value = {{
                user,
                setUser,
                profile,
                setProfile,
                loading,
                setLoading,
                logout,
                isAdm
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);