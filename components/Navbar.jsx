import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav>
                <div className="fixed z-50 w-full backdrop-blur-2xl h-16 flex justify-between items-center px-6 ">
                    <h1 className="text-xl font-bold">مونالرن</h1>

                    <div>
                        <MenuIcon />
                    </div>

                    {/* <div className="absolute top-16">
                        <Link href="/login" className="bg-accent text-white text-sm rounded-2xl px-3 py-2">
                            شروع یادگیری
                        </Link>
                        <Link href="/login" className="px-3 py-2 text-sm rounded-2xl">
                            ورود به حساب کاربری
                        </Link>
                    </div> */}
                </div>
            </nav >
        </>
    )
}