import Link from "next/link"
import VoterTable from "./voterListTable"

const Voters = () => {
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-16 px-32">
                <h1 className="text-3xl underline font-mono">VOTER LIST</h1>
                <Link href={'/auth/register'}>Register A voter</Link>
                <br /><br />
                <VoterTable />
            </main>
        </>
    )
}
export default Voters