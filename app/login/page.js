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
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>


            <br />
            <br />
            <br />
            <br />
            <button type="button" onClick={handleGoogleLogin}>
                Continue with Google
            </button>

        </form>
    );
}
