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
        <div>
            <h1>سلام {userData.name} 👋</h1>
            <p>سن: {userData.age}</p>
            <p>جنسیت: {userData.gender}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
