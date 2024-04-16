import { ModeToggle } from "./ModeToggleBtn"
import Link from "next/link"
import { getServerSession } from "next-auth"
import Logout from "@/app/(users)/logout";
import { getSession, useSession } from "next-auth/react";
import { userAgent } from "next/server";
import { getToken } from "next-auth/jwt";

const Navbar = async () => {
    const session = await getServerSession();
    // const session = await getSession();
    // const { data: sessions, status } = useSession();
    console.log("SEssions : ")
    console.log(session?.user)

    return (
        <>
            {/* <div>navbar</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis porro reiciendis earum, blanditiis error, in alias possimus delectus rem, aliquid dolore pariatur eaque cum repellat.</p> */}
            <div className="w-full flex justify-center items-center mt-4 fixed z-30">
                <div className="h-14 w-[65%] flex font-semibold text-md  items-center justify-around text-[#121212] dark:text-white p-1 border-[#3e3e3e] border-[0.11px] rounded-full backdrop-blur-[12px] bg-gray-400/40 dark:bg-gray-900/20  " >
                    <Link href={"/"} className="hover:text-lg transition-all delay-75 focus:text-xl">Home</Link>
                    <Link href={"/elections"} className="hover:text-lg transition-all delay-75 focus:text-xl">Elections</Link>
                    <Link href={"/support"} className="hover:text-lg transition-all delay-75 focus:text-xl">Support</Link>
                    {/* <Link href={"/candidates"}>Candidates</Link> */}
                    {/* <Link href={"/results"}>Results</Link> */}
                    <span className=" border-[0.03px] border-[#4c4c4c] px-4 p-1 rounded-3xl">
                        {!!session &&
                            <span>
                                <Logout />
                            </span>
                        }
                        {!session && <Link href={"/auth/login"} className="hover:text-lg transition-all delay-75 focus:text-xl">Login</Link>}
                    </span>
                    <Link href={"/admin"} className="hover:text-lg transition-all delay-75 focus:text-xl">Admin</Link>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}

export default Navbar