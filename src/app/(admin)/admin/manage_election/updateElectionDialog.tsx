import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
        const election_name = String(formData.get('election_name') || '').trim();
        const current_status_val = String(formData.get('current_status') || '').trim().toLowerCase();
        const current_status = current_status_val === 'true' || current_status_val === '1';

        const response = await fetch('/api/admin/electionList', {
            method: 'PUT',
            body: JSON.stringify({
                election_id: election.election_id,
                election_name,
                current_status,
            }),
        });
        if (response.ok) {
            window.location.reload();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-none w-full justify-start text-left">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={updateElection} className="grid gap-4 py-4 px-10">
                    <Input name="election_name" className="col-span-3 w-full" defaultValue={election.election_name} placeholder="Election Name" required />
                    <Input name="current_status" className="col-span-3" defaultValue={String(election.current_status)} placeholder="Status (true/false)" required />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}