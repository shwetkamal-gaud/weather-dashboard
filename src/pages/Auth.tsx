import { useState } from "react";
import supabase  from "../lib/supabaseClient";

export const Auth = () => {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) alert(error.message);
        else alert("Check your email for the login link!");
    };

    return (
        <div className="p-4 bg-white shadow rounded w-full max-w-sm mx-auto mt-6">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
                type="email"
                className="border px-3 py-2 rounded w-full mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Login via Magic Link
            </button>
        </div>
    );
};
