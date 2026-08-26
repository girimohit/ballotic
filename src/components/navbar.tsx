import Link from "next/link"
import { getServerSession } from "next-auth"
import Logout from "@/app/(users)/logout";
import { Vote } from "lucide-react";

const Navbar = async () => {
    const session = await getServerSession();
    const username = session?.user?.name || "user";
    const isAdmin = (session?.user as any)?.role === "admin";

    return (
        <div className="w-full fixed top-0 left-0 right-0 z-30 flex justify-center mt-4 px-4 md:px-8">
            <div className="w-full max-w-7xl flex justify-between items-center">
                {/* Left Side Navigation Pill */}
                <div className="h-12 flex font-semibold text-sm items-center gap-6 px-6 border-border/40 border-[0.11px] rounded-full backdrop-blur-[20px] bg-background/20 glass-panel">
                    <Link href={"/"} className="flex items-center gap-2 hover:text-primary transition-all duration-200">
                        <Vote size={20} className="text-primary" />
                        <span className="font-bold tracking-tight">Ballotic</span>
                    </Link>
                    <span className="text-border/40">|</span>
                    <Link href={"/"} className="hover:text-primary transition-all duration-200">Home</Link>
                    <Link href={"/elections"} className="hover:text-primary transition-all duration-200">Elections</Link>
                    {isAdmin && (
                        <Link href={"/admin/voters"} className="hover:text-primary transition-all duration-200">Admin</Link>
                    )}
                </div>

                {/* Right Side Auth Pill */}
                <div className="h-12 flex font-semibold text-sm items-center px-6 border-border/40 border-[0.11px] rounded-full backdrop-blur-[20px] bg-background/20 glass-panel">
                    {session ? (
                        <Logout name={username} />
                    ) : (
                        <div className="flex gap-4">
                            <Link href={"/auth/login"} className="hover:text-primary transition-all duration-200">Login</Link>
                            <span className="text-border/40">|</span>
                            <Link href={"/auth/register"} className="hover:text-primary transition-all duration-200">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar

/* --- OLD CODE COMMENTED OUT ---
import Link from "next/link"
import { getServerSession } from "next-auth"
import Logout from "@/app/(users)/logout";
import { getSession, useSession } from "next-auth/react";
import { userAgent } from "next/server";
import { getToken } from "next-auth/jwt";

const Navbar = async () => {
    const session = await getServerSession();
    const username = session?.user?.name || "user";
    return (
        <>
            <div className="w-full flex justify-center items-center  mt-4 fixed z-30">
                <div className="h-12 md:w-[50%] w-full flex font-semibold text-md  items-center justify-around text-[#121212] dark:text-white p-1 border-[#3e3e3e] border-[0.11px] rounded-full backdrop-blur-[20px] bg-gray-400/20 dark:bg-gray-900/20  " >
                    <Link href={"/"} className="hover:text-lg transition-all delay-75 focus:text-xl">Home</Link>
                    <Link href={"/elections"} className="hover:text-lg transition-all delay-75 focus:text-xl">Elections</Link>
                    <Link href={"/admin/voters"} className="hover:text-lg transition-all delay-75 focus:text-xl">Admin</Link>
                    <span>
                        {!!session &&
                            <span>
                                <Logout name={username} />
                            </span>
                        }
                        {!session && <Link href={"/auth/login"} className="hover:text-lg transition-all delay-75 focus:text-xl">Login</Link>}
                    </span>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}
export default Navbar
*/