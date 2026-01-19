import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 p-6 text-black rounded-lg flex flex-col justify-center items-center">
            <div className="w-full md:max-w-2xl">
                <h1 className="text-3xl mb-5 font-extrabold">مونالرن</h1>
                <div className="border-t-2 border-t-blue-500 pt-4">
                    <p>
                        پلتفرم آموزشی مونالرن با هدف ارتقاء مهارت‌های برنامه‌نویسی و عکاسی و فیلمبرداری ایجاد شده است. در اینجا می‌توانید دوره‌های متنوعی را بیابید که به شما کمک می‌کنند تا دانش خود را گسترش دهید و پیشرفت کنید.
                    </p>
                </div>

                <div className="mt-8 flex">
                    <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600 transition">
                        ثبت‌نام
                    </Link>
                    <Link href="/login" className="bg-gray-200 text-black mx-2 px-4 py-2 rounded hover:bg-gray-300 transition">
                        ورود
                    </Link>
                </div>
            </div>
        </div>
    )
}