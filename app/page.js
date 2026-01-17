"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      Welcome to Monaed!
      <br />
      Okay! Sign up here
      <br />
      <Link href="/signup">Sign Up</Link>
      <br />
      or Login here
      <br />
      <Link href="/login">Login</Link>
    </div>
  )
}
