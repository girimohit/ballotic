import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"

interface Candidate {
    election_id: number
    election_name: string
    start_date: Date
    end_date: Date
    current_status: boolean
    ward_name: string
    district_name: string
}

export default function UpdateElectionDialog({ election }: { election: Candidate }) {
    const updateElection = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const lowercaseData: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch('http://localhost:3000/api/admin/electionList', {
            method: 'PUT',
            body: JSON.stringify({
                // name: formData.get('name'),
                election_id: election.election_id,
                election_name: lowercaseData['election_name'],
                current_status: lowercaseData['current_status'],
            }),
        });
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-none">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription> */}
                </DialogHeader>
                <form onSubmit={updateElection} className="grid gap-4 py-4 px-10">
                    <Input name="election_name"  className="col-span-3 w-full" placeholder="Election Name" />
                    <Input name="current_status"  className="col-span-3" placeholder="Status" />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}





