"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormEvent } from "react"

const AddVoter = () => {
    const handleVoterSubmitByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('username') || '').trim().toLowerCase();
        const password = String(formData.get('pass') || ''); // DO NOT LOWERCASE PASSWORD
        const email = String(formData.get('email') || '').trim().toLowerCase();
        const role = String(formData.get('role') || 'voter').trim().toLowerCase();
        const ward_num = String(formData.get('ward_number') || '');
        const district_id = String(formData.get('district_id') || '');

        const response = await fetch('/api/admin/voterList', {
            method: 'POST',
            body: JSON.stringify({
                name,
                password,
                email,
                role,
                ward_num,
                district_id,
            }),
        });
        if (response.ok) {
            window.location.reload();
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Voter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader />
                <form onSubmit={handleVoterSubmitByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1 className="text-lg font-bold">Register Voter</h1>
                    <Input type="text" name="username" placeholder="Name" required />
                    <Input type="password" name="pass" placeholder="Password" required />
                    <Input type="email" name="email" placeholder="Email" required />
                    <Input type="text" name="role" placeholder="Role" defaultValue="voter" required />
                    <Input type="number" name="ward_number" placeholder="Ward Number" required />
                    <Input type="number" name="district_id" placeholder="District ID" required />
                    <Button type="submit">Register Voter</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddVoter;