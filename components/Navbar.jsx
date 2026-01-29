"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav>
            <div className="fixed z-50 w-full backdrop-blur-2xl h-20 flex justify-between items-center px-6">
                <h1 className="text-xl text-blue font-bold">مونالرن</h1>

                <div
                    onClick={() => setOpen(!open)}
                    className="hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition"
                >
                    <MenuIcon />
                </div>

                {open && (
                    <div className="absolute h-auto right-6 left-6 top-20 px-2 py-2 flex flex-col gap-2 bg-white shadow-lg rounded-2xl">
                        <div className="flex flex-col">
                            <Link
                                href="/login"
                                className="bg-background px-3 py-4 text-sm rounded-t-2xl text-center hover:bg-gray-200 transition"
                            >
                                ورود به حساب کاربری
                            </Link>
                            <Link
                                href="/sign-up"
                                className="bg-accent text-white text-sm rounded-b-2xl px-3 py-4 mt-2 text-center hover:bg-blue-800/80 transition"
                            >
                                ثبت‌نام
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
