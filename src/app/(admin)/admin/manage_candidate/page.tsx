import { Input } from "@/components/ui/input"
import CandidateTable from "./candidateTable"
import { Button } from "@/components/ui/button"
import AddCandidateByAdmin from "./addCandidate"

const ManageCandidatePage = () => {
    return (
        <>
            <main className="w-full min-h-screen flex-col pt-5 px-16">
                <div className=" flex items-center justify-end gap-3">
                    <Input className="w-64" placeholder="Search For candidates" />
                    {/* <Button>Add</Button> */}
                    <AddCandidateByAdmin />
                </div>

                <div className="w-full flex items-center  flex-col">
                    <br />
                    <h1 className="text-3xl font-mono">CANDIDATES</h1>
                    <br /><br />
                    <CandidateTable />
                </div>
            </main>
        </>
    )
}
export default ManageCandidatePage