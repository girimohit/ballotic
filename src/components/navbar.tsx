import { ModeToggle } from "./ModeToggleBtn"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { LogOut } from "lucide-react";
import Logout from "@/app/logout";

const Navbar = async () => {
    const session = await getServerSession();
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
                    <Link href={"/auth"} className=" border-[0.03px] border-[#4c4c4c] px-3 p-1 rounded-3xl">Register/Login</Link>
                    {!!session && <Logout />}
                    {!session && <Link href={"/auth/login"}>Login</Link>}
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}

export default Navbar