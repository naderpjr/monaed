"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";



export default function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                router.push("/login");
                return;
            }


            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setUserData(snap.data());
            }
        });

        return () => unsub();
    }, [router]);

    if (!userData) return <p>Loading...</p>;

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col space-y-4 text-right">

            <h1 className="text-2xl font-bold text-accent">
                سلام {userData.name}
            </h1>

            <div className="text-gray-700 space-y-1">
                <p>سن: <span className="font-medium">{userData.age}</span></p>
                <p>جنسیت: <span className="font-medium">{userData.gender}</span></p>
            </div>




            <div>
                <h2 className="text-xl font-semibold mb-2">دوره‌های من</h2>
                <p className="text-gray-600">شما هنوز دوره‌ای ثبت نکرده‌اید.</p>
            </div>


            <button
                onClick={handleLogout}
                className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                خروج
            </button>


        </div>
    );

}
