import { createContext, useContext, useEffect, useState } from "react";
import supabase  from "../lib/supabaseClient";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
        supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
