import Link from "next/link";

export default function Header() {
    return (
        <div className="relative w-full h-screen  text-black rounded-lg flex flex-col justify-center items-center overflow-hidden">

            <div className="w-80 h-80  absolute -top-18 -left-18 blur-3xl overflow-hidden"></div>
            <div className="w-80 h-80  absolute bottom-38 -right-18 blur-3xl overflow-hidden"></div>

            <div className="w-full md:max-w-2xl absolute px-10 md:px-0 text-center flex flex-col justify-center items-center">
                <h1 className="text-blue text-3xl mb-3 font-extrabold leading-15  md:text-5xl">پلتفرم آموزشی و توانمندی سازی دختران در افغانستان</h1>

                <div className="mt-3 flex">
                    {/* <Link href="/signup" className="bg-blue-500/65 backdrop-blur-3xl text-white px-4 py-2 rounded mx-2 hover:bg-blue-500 transition">
                        ثبت‌نام
                    </Link> */}
                    <Link href="/login" className="bg-accent  text-white backdrop-blur-3xl mx-2 px-7 py-3 rounded-2xl transition">
                        شروع یادگیری
                    </Link>
                </div>
            </div>
        </div>
    )
}