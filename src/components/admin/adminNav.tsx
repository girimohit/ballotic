import { Fahkwang } from "next/font/google";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { ModeToggle } from "../ModeToggleBtn";
import { MdLeaderboard } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";

const AdminNavbar = () => {
    return (
        <>
            {/* <div className="w-full h-[3rem] flex justify-between items-center z-20 px-6 py-2 text-[#121212] dark:text-white bg-gray-400/40 dark:bg-black/50 backdrop-blur-[12px] border-[0.11px] border-b-[#3e3e3e] text-sm fixed" >
                <div className="flex gap-7">
                    <Link href={"/"} >Home</Link>
                    <Link href={"/"} >Candidater</Link>
                    <div>AdminNavbar</div>
                </div>
                <div className="flex gap-5">
                    <p>searchbar</p>
                    <p>Profile icon</p>
                </div>
            </div> */}

            <div className="dark:bg-black bg-gray-400 min-h-screen w-[25%]  "  >
                <div className="text-center text-4xl p-7 font-bold" ><h1>ballotic</h1></div>
                <div className="flex flex-col px-7 py-5 items-start gap-3 dark:text-white">
                    <h1 className="text-gray-400 px-2" >MENU</h1>
                    <Link href={"/"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><FaHome className="text-xl" /> Home</Link>
                    <Link href={"/admin/voters"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><MdManageAccounts className="text-xl" />Manage Voter</Link>
                    <Link href={"/admin/manage_candidate"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><RiAdminFill className="text-xl" />Manage Candidate</Link>
                    <Link href={"/admin/manage_election"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg " ><SiGoogletagmanager className="text-xl" />Manage Election</Link>
                    <Link href={"/faqs"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg " ><GiNotebook className="text-xl" />Additional Queries</Link>
                    {/* <Link href={"/admin/manage_election"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg " ><IoIosSettings className="text-xl" />Settings</Link> */}
                </div>
                <span className="absolute top-3 right-4 z-10"><ModeToggle /></span>
            </div>
        </>
    )
}
export default AdminNavbar