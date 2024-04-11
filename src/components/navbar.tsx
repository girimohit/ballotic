import { ModeToggle } from "./ModeToggleBtn"
import Link from "next/link"

const Navbar = () => {
    return (
        <>
            {/* <div>navbar</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis porro reiciendis earum, blanditiis error, in alias possimus delectus rem, aliquid dolore pariatur eaque cum repellat.</p> */}
            <div className="w-full flex justify-center items-center mt-4 fixed">
                <div className=" w-[60%] flex items-center justify-around text-[#121212] dark:text-white p-1 border-[#3e3e3e] border-[0.11px] rounded-3xl backdrop-blur-[12px] bg-white/40 dark:bg-black/40 " >
                    <Link href={"/"}>Home</Link>
                    <Link href={"/result"}>Elections</Link>
                    {/* <Link href={"/candidates"}>Candidates</Link> */}
                    {/* <Link href={"/results"}>Results</Link> */}
                    <Link href={"/auth"} className=" border-[0.03px] border-[#4c4c4c] px-3 p-1 rounded-3xl">Register/Login</Link>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}
export default Navbar


