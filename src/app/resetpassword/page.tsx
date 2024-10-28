"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");

    const router = useRouter();

    const onResetPassword = async () => {
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            toast.error("Password does not match")
            return; 
        }

        try {
            const res = await axios.post('/api/users/resetpassword', { token, password, confirmPassword });
            console.log(res.data);
            toast.success("Password Changed Successfully");
            router.push('/login')
            
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Something went wrong")
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>Reset Password</h1>
            <hr />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
            />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onResetPassword}
            >
                Submit
            </button>
        </div>
    );
}
