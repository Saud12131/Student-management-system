import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created Successfully!");
            navigate("/home");
        } catch (error: any) {
            alert(error.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            autoComplete="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            autoComplete="email"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
                >
                    login
                </button>
            </div>
        </div>
    );
};

export default Signup;
