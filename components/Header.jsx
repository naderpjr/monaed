import Link from "next/link";

export default function Header() {
    return (
        <div className="relative w-full h-screen  text-black rounded-lg flex flex-col justify-center items-center overflow-hidden">

            <div className="w-80 h-80 bg-blue-300 absolute -top-18 -left-18 blur-3xl overflow-hidden"></div>
            <div className="w-80 h-80 bg-blue-300 absolute bottom-38 -right-18 blur-3xl overflow-hidden"></div>

            <div className="w-full md:max-w-2xl absolute px-10 md:px-0 text-center flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-5 font-extrabold">مونالرن</h1>
                <div className="border-t-2 border-t-blue-500 pt-4">
                    <p>
                        پلتفرم آموزشی مونالرن با هدف ارتقاء مهارت‌های برنامه‌نویسی و عکاسی و فیلمبرداری ایجاد شده است. در اینجا می‌توانید دوره‌های متنوعی را بیابید که به شما کمک می‌کنند تا دانش خود را گسترش دهید و پیشرفت کنید.
                    </p>
                </div>

                <div className="mt-8 flex">
                    <Link href="/signup" className="bg-blue-500/65 backdrop-blur-3xl text-white px-4 py-2 rounded mx-2 hover:bg-blue-500 transition">
                        ثبت‌نام
                    </Link>
                    <Link href="/login" className="bg-white/35 backdrop-blur-3xl text-black mx-2 px-4 py-2 rounded hover:bg-white/65 transition">
                        ورود
                    </Link>
                </div>
            </div>
        </div>
    )
}