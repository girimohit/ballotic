import { Input } from "@/components/ui/input"
import CandidateTable from "./candidateTable"
import { Button } from "@/components/ui/button"
import AddCandidateByAdmin from "./addCandidate"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage Candidates",
    description: "Generated by create next app",
};

const ManageCandidatePage = () => {
    return (
        <>
            <main className="w-full min-h-screen flex-col pt-5 px-16">
                {/* <div className=" flex items-center justify-end gap-3">
                </div> */}

                <div className="w-full flex items-center  flex-col">
                    <CandidateTable />
                </div>
            </main>
        </>
    )
}
export default ManageCandidatePage