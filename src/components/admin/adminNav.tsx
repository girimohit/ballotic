import { Fahkwang } from "next/font/google";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";

const AdminNavbar = () => {
    return (
        <>
            <div className="dark:bg-black bg-gray-400 min-h-screen w-[25%]" >
                <div className="text-center text-4xl p-7 font-bold" ><h1>ballotic</h1></div>
                <div className="flex flex-col px-7 py-5 items-start gap-3 dark:text-white">
                    <h1 className="text-gray-400 px-2" >MENU</h1>
                    <Link href={"/"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><FaHome className="text-xl" /> Home</Link>
                    <Link href={"/admin/voters"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><MdManageAccounts className="text-xl" />Manage Voter</Link>
                    <Link href={"/admin/manage_candidate"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg"><RiAdminFill className="text-xl" />Manage Candidate</Link>
                    <Link href={"/admin/manage_election"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg " ><SiGoogletagmanager className="text-xl" />Manage Election</Link>
                    <Link href={"/faqs"} className="flex items-center gap-2 p-1.5 px-3 w-full rounded-lg " ><GiNotebook className="text-xl" />Additional Queries</Link>
                </div>
            </div>
        </>
    )
}
export default AdminNavbar