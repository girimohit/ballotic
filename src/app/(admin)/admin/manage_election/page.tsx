import { Input } from "@/components/ui/input"
import ElectionTable from "./electionTable"
import { Button } from "@/components/ui/button"
import AddElectionByAdmin from "./addElection"

const ManageCandidatePage = () => {
    return (
        <>
            <main className="w-full min-h-screen flex-col pt-5 px-16">
                <div className=" flex items-center justify-end gap-3">
                    <Input className="w-64" placeholder="Search for election" />
                    {/* <Button>Add</Button> */}
                    <AddElectionByAdmin />
                </div>

                <div className="w-full flex items-center  flex-col">
                    <br />
                    <h1 className="text-3xl font-mono">ELECTIONS</h1>
                    <br /><br />
                    <ElectionTable />
                </div>
            </main>
        </>
    )
}
export default ManageCandidatePage