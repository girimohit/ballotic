import Link from "next/link"
import VoterTable from "./voterListTable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Voters = () => {
    return (
        <>
            <main className="w-full min-h-screen flex-col pt-5 px-16">
                <div className=" flex items-center justify-end gap-3">
                    <Input className="w-64" placeholder="Search For candidates" />
                    <Button>Add</Button>
                </div>

                <div className="w-full flex items-center  flex-col">
                    <br />
                    <h1 className="text-3xl font-mono">VOTERS</h1>
                    <br /><br />
                    <VoterTable />
                </div>
            </main>
        </>
    )
}
export default Voters