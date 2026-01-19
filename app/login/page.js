"use client";

import { useState } from "react";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("ایمیل و پسورد را وارد کنید");
            return;
        }

        try {
            setIsLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: "کاربر",
                    email: user.email,
                    provider: "email",
                    createdAt: serverTimestamp(),
                });
            }

            router.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);

            // پیام‌های خطای بهتر
            if (error.code === "auth/invalid-credential") {
                alert("ایمیل یا پسورد اشتباه است");
            } else if (error.code === "auth/user-not-found") {
                alert("کاربری با این ایمیل یافت نشد");
            } else if (error.code === "auth/wrong-password") {
                alert("پسورد اشتباه است");
            } else {
                alert("خطا در ورود: " + error.message);
            }

            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const provider = new GoogleAuthProvider();


            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google user:", user);

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName || "کاربر گوگل",
                    email: user.email,
                    photoURL: user.photoURL || null,
                    provider: "google",
                    createdAt: serverTimestamp(),
                });
                console.log("New user created in Firestore");
            } else {
                console.log("Existing user found");
            }

            router.push("/dashboard");
        } catch (error) {
            console.error("Google login error:", error);

            if (error.code === "auth/popup-closed-by-user") {
                alert("پنجره ورود بسته شد");
            } else if (error.code === "auth/popup-blocked") {
                alert("مرورگر شما popup را مسدود کرده است. لطفاً popup را فعال کنید");
            } else if (error.code === "auth/cancelled-popup-request") {
            
                console.log("Popup cancelled");
            } else {
                alert("خطا در ورود با گوگل: " + error.message);
            }

            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 p-6 flex flex-col justify-center items-center">
            <form
                className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg"
                onSubmit={handleEmailLogin}
            >
                <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
                    ورود به حساب کاربری
                </h1>

                <input
                    className="w-full outline-none border-2 border-gray-300 focus:border-blue-500 px-4 py-3 mb-4 rounded transition"
                    placeholder="ایمیل"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />

                <input
                    className="w-full outline-none border-2 border-gray-300 focus:border-blue-500 px-4 py-3 mb-6 rounded transition"
                    type="password"
                    placeholder="پسورد"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />

                <button
                    className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "در حال ورود..." : "ورود"}
                </button>

                <div className="my-4 text-center text-gray-500 relative">
                    <span className="bg-white px-4 relative z-10">یا</span>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 z-0"></div>
                </div>

                <button
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>ورود با گوگل</span>
                </button>
            </form>
        </div>
    );
}