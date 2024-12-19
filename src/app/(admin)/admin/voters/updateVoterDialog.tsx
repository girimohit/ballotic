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
        const lowercaseData: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch('http://localhost:3000/api/admin/voterList', {
            method: 'PUT',
            body: JSON.stringify({
                // name: formData.get('name'),
                voter_id: user.voter_id,
                username: lowercaseData['username'],
                email: lowercaseData['email'],
            }),
        });
        if (response.status === 200) {
            window.location.reload();
        }
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
                <form onSubmit={updateVoter} className="grid gap-4 py-4 px-10">
                    <Input id="username" name="username" className="col-span-3 w-full" placeholder="username" />
                    <Input id="email" name="email" className="col-span-3" placeholder="email" />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}





