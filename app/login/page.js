"use client";

import { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // ⚡ بعد از Google Redirect
    useEffect(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (!result) return;
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

                router.push("/dashboard"); // بعد از پردازش → ریدایرکت
            })
            .catch((err) => {
                console.error(err);
                alert("Google login failed");
            });
    }, [router]);

    // Email / Password Login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("ایمیل و پسورد را وارد کنید");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // داده‌ها رو از Firestore بخون
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                // اگر اولین بار لاگین کرد
                await setDoc(ref, {
                    name: "کاربر",
                    email: user.email,
                    provider: "email",
                    createdAt: serverTimestamp(),
                });
            }

            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Login failed: " + err.message);
        }
    };

    // Google Login
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider); // ⚡ Redirect نه popup
    };

    return (
        <div className="w-full h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 p-6 flex flex-col justify-center items-center">
            <form className="w-100 p-10 flex flex-col justify-between" onSubmit={handleLogin}>
                <h1 className="text-3xl mb-4">ورود به حساب کاربری</h1>
                <input
                    className="outline-none border-2 border-blue-300 px-2 py-2 m-3"
                    placeholder="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="outline-none border-2 border-blue-300 px-2 py-2 m-3"
                    type="password"
                    placeholder="پسورد"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600"
                    type="submit"
                >
                    ورود
                </button>

                <div className="my-6 text-center">یا</div>

                <button
                    className="bg-red-500 text-white px-4 py-2 rounded mx-2 hover:bg-red-600"
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    ورود با گوگل
                </button>
            </form>
        </div>
    );
}
