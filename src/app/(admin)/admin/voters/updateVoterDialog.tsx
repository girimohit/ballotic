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

interface User {
    voter_id: number
    username: string
    emaill: string
    role: string
    ward_number: number
    district_id: number
    district_name: string
}

export default function UpdateDialog({ user }: { user: User }) {
    const updateVoter = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = String(formData.get('username') || '').trim().toLowerCase();
        const email = String(formData.get('email') || '').trim().toLowerCase();
        
        const response = await fetch('/api/admin/voterList', {
            method: 'PUT',
            body: JSON.stringify({
                voter_id: user.voter_id,
                username,
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
                <form onSubmit={updateVoter} className="grid gap-4 py-4 px-10">
                    <Input id="username" name="username" className="col-span-3 w-full" defaultValue={user.username} placeholder="username" required />
                    <Input id="email" name="email" className="col-span-3" defaultValue={user.emaill} placeholder="email" required />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}