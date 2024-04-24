"use client"
import RegisterVoterForm from "@/app/(users)/auth/register/registerForm"
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
import { signIn } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FormEvent } from "react"

const AddVoter = () => {

    const handleVoterSubmitByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        //  Create an object to store the lowercase data
        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch('http://localhost:3000/api/admin/voterList', {
            method: 'POST',
            body: JSON.stringify({
                // name: formData.get('name'),
                name: lowercaseData['username'],
                password: lowercaseData['pass'],
                email: lowercaseData['email'],
                role: lowercaseData['role'],
                ward_num: lowercaseData['ward_number'],
                district_id: lowercaseData['district_id'],
            }),
        });
        if (response.ok) {
            redirect("/");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Voter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {/* <DialogTitle>Edit profile</DialogTitle> */}
                </DialogHeader>
                <form onSubmit={handleVoterSubmitByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1>Register Voter</h1>
                    <Input type="text" name="username" placeholder="Name" required />
                    <Input type="password" name="pass" placeholder="Password" required />
                    <Input type="email" name="email" placeholder="Email" required />
                    <Input type="text" name="role" placeholder="Role" required />
                    <Input type="number" name="ward_number" placeholder="ward_number" required />
                    <Input type="number" name="district_id" placeholder="District ID" required />
                    <Button type="submit">Register</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddVoter