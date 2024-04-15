import { ModeToggle } from "./ModeToggleBtn"
import Link from "next/link"
import { getServerSession } from "next-auth"
import Logout from "@/app/logout";
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
                <div className="h-14 w-[65%] flex items-center justify-around text-[#121212] dark:text-white p-1 border-[#3e3e3e] border-[0.11px] rounded-full backdrop-blur-[12px] bg-white/40 dark:bg-black/40 " >
                    <Link href={"/"}>Home</Link>
                    <Link href={"/elections"}>Elections</Link>
                    {/* <Link href={"/candidates"}>Candidates</Link> */}
                    {/* <Link href={"/results"}>Results</Link> */}
                    <span className=" border-[0.03px] border-[#4c4c4c] px-4 p-1 rounded-3xl">
                        {!!session &&
                            <span>
                                <Logout />
                            </span>
                        }
                        {!session && <Link href={"/auth/login"}>Login</Link>}
                    </span>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}

export default Navbar