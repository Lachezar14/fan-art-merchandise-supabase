import React from "react";
import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get session data if there is an active session
    supabase.auth.getSession().then(({ data: { session } })=> {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // listen for changes to auth
    const { data: { subscription }} = supabase.auth.onAuthStateChange( 
        async (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
    );

    // cleanup the useEffect hook
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const value = {
    user
  }
  
  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
}