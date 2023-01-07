import React from "react";
import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";
import {useAuth} from "./AuthContext";

const UserProfileSetup = React.createContext();

export function useProfileSetup() {
    return React.useContext(UserProfileSetup);
}

export function UserProfileSetupProvider({ children }) {

    const {user} = useAuth();
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        const fetchUserProfile = async () => {
            let { data, error } = await supabase.from('userInfo').select('*').eq('id', user.id);
            console.log(data);
            if(data.length > 0) {
                setUserProfile(data);
            }else {
                setUserProfile(null);
            }
        };
        fetchUserProfile();
    }, []);
    
    const value = {
        userProfile
    }

    return <UserProfileSetup.Provider value={value}>
        {children}
    </UserProfileSetup.Provider>
}