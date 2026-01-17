"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {

            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const uid = userCred.user.uid;


            await setDoc(doc(db, "users", uid), {
                name,
                age: Number(age),
                gender,
                email,
                createdAt: serverTimestamp(),
            });

            router.push("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="w-full h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 p-6 text-black rounded-lg flex flex-col justify-center">
            <form className="w-100 p-10 flex flex-col justify-between" onSubmit={handleSignup}>
                <h1 className="text-3xl">ثبت نام</h1>

                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" placeholder="اسم" onChange={(e) => setName(e.target.value)} />
                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" placeholder="سن" onChange={(e) => setAge(e.target.value)} />

                <select className="outline-none border-2 border-blue-300 px-2 py-2 m-3" onChange={(e) => setGender(e.target.value)}>
                    <option value="">جنسیت</option>
                    <option value="male">مذکر</option>
                    <option value="female">مونث</option>
                </select>

                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" placeholder="ایمیل" onChange={(e) => setEmail(e.target.value)} />
                <input className="outline-none border-2 border-blue-300 px-2 py-2 m-3" type="password" placeholder="پسورد" onChange={(e) => setPassword(e.target.value)} />

                <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600">ثبت نام</button>
            </form>
        </div>
    );
}
