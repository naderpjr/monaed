"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };


    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);
            const user = result.user;


            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);


            if (!snap.exists()) {
                await setDoc(ref, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    provider: "google",
                    createdAt: serverTimestamp(),
                });
            }

            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Google login failed");
        }
    };


    return (
        <div className="w-full h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 p-6 text-black rounded-lg flex flex-col justify-center">
            <form lassName="w-100 p-10 flex flex-col justify-between" onSubmit={handleLogin}>
                <h1 className="text-3xl">ورود به حساب کاربری</h1>
                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" placeholder="ایمیل" onChange={(e) => setEmail(e.target.value)} />
                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" type="password" placeholder="پسورد" onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600" type="submit">ورود</button>


                <br />
                <br />
                <br />
                <br />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600" type="button" onClick={handleGoogleLogin}>
                    Continue with Google
                </button>

            </form>
        </div>
    );
}
