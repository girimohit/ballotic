import { Input } from "@/components/ui/input"
import ElectionTable from "./electionTable"

const ManageCandidatePage = () => {
    return (
        <>
            <main className="w-full relative flex items-center min-h-screen flex-col pt-16 px-32">
                <Input className="w-64 absolute right-5 top-7" placeholder="Search For candidates" />
                <br />
                <h1 className="text-3xl underline font-mono">CANDIDATES</h1>
                <br /><br />
                <ElectionTable />
            </main>
        </>
    )
}
export default ManageCandidatePage