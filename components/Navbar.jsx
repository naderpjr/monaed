import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav>
                <div className=" absolute top-2.5 z-50 w-full h-16 flex justify-between items-center px-6 ">
                    <h1 className="text-2xl font-black">مونالرن</h1>

                    <div className="flex">
                        <Link href="/login" className="  text-sm backdrop-blur-3xl mx-2 px-5 py-3 rounded-2xl ">
                            شروع یادگیری
                        </Link>
                        <Link href="/login" className=" text-sm backdrop-blur-3xl mx-2 px-5 py-3 rounded-2xl">
                            ورود به حساب کاربری
                        </Link>
                    </div>
                </div>
            </nav >
        </>
    )
}