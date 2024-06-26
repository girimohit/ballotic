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
    const username = session?.user?.name || "user";
    console.log("SEssions : ")
    console.log(session?.user)
    console.log(session?.user?.name)

    return (
        <>
            <div className="w-full flex justify-center items-center  mt-4 fixed z-30">
                <div className="h-12 md:w-[75%] w-full flex font-semibold text-md  items-center justify-around text-[#121212] dark:text-white p-1 border-[#3e3e3e] border-[0.11px] rounded-full backdrop-blur-[20px] bg-gray-400/20 dark:bg-gray-900/20  " >
                    {/* <div className="border-b-transparent outline absolute left-0 border-b-[3.5rem] rotate-90 rounded-xl border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent h-0 w-[100px] ">loerm2</div> */}
                    <Link href={"/"} className="hover:text-lg transition-all delay-75 focus:text-xl">Home</Link>
                    <Link href={"/elections"} className="hover:text-lg transition-all delay-75 focus:text-xl">Elections</Link>
                    {/* <Link href={"/candidates"}>Candidates</Link> */}
                    {/* <Link href={"/results"}>Results</Link> */}
                    <Link href={"/faqs"} className="hover:text-lg transition-all delay-75 focus:text-xl">FAQs</Link>
                    <Link href={"/admin/voters"} className="hover:text-lg transition-all delay-75 focus:text-xl">Admin</Link>
                    {/* <span className=" border-[0.03px] border-[#4c4c4c] px-4 p-1 rounded-3xl"> */}
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