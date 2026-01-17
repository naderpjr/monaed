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
    <form onSubmit={handleSignup}>
      <h1>Sign Up</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      
      <select onChange={(e) => setGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button>Register</button>
    </form>
  );
}
