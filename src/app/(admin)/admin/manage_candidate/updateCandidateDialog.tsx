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
    candidate_id: number
    name: string
    emaill: string
    party_id: number
    election_id: number
    district_name: string
}

export default function UpdateCandidateDialog({ user }: { user: Candidate }) {
    const updateCandidate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim().toLowerCase();
        
        const response = await fetch('/api/admin/candidateList', {
            method: 'PUT',
            body: JSON.stringify({
                candidate_id: user.candidate_id,
                name,
                email,
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
                <form onSubmit={updateCandidate} className="grid gap-4 py-4 px-10">
                    <Input id="name" name="name" className="col-span-3 w-full" defaultValue={user.name} placeholder="name" required />
                    <Input id="email" name="email" className="col-span-3" defaultValue={user.emaill} placeholder="email" required />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}