import Link from "next/link"
import VoterTable from "./voterListTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AddVoter from "./addVoter"
import RegisterVoterForm from "@/app/(users)/auth/register/registerForm"
import { IoFilterOutline } from "react-icons/io5";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage Voters",
    description: "Generated by create next app",
};

const Voters = () => {
    return (
        <>
            <main className="w-full min-h-screen flex-col pt-5 px-16">
                {/* <div className=" flex items-center justify-end gap-3"> */}
                {/* <IoFilterOutline /> */}
                {/* <Input className="w-64" placeholder="Search For candidates" /> */}
                {/* <Button>Add</Button> */}
                {/* <RegisterVoterForm /> */}
                {/* </div> */}
                <div className="w-full flex items-center  flex-col">
                    <VoterTable />
                </div>
            </main>
        </>
    )
}
export default Voters