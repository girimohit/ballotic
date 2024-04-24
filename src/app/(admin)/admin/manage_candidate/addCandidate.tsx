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
import { FormEvent } from "react";
import { Input } from "@/components/ui/input"

const AddCandidateByAdmin = () => {



    const handleAddElectionByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        //  Create an object to store the lowercase data
        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch("http://localhost:3000/api/admin/candidateList", {
            method: "POST",
            body: JSON.stringify({
                // name: formData.get('name'),
                candidate_name: lowercaseData["candidate_name"],
                candidate_email: lowercaseData["candidate_email"],
                party_id: lowercaseData["party_id"],
                election_id: lowercaseData["election_id"],
            }),
        });
        // if (response.ok) {
        //     redirect("/");
        // }
    };




    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Candidate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {/* <DialogTitle>Edit profile </DialogTitle> */}
                </DialogHeader>
                <form onClick={handleAddElectionByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1>Register Candidate</h1>
                    <Input type="text" name="candidate_name" placeholder="Name" required />
                    <Input type="email" name="candidate_email" placeholder="Email" required />
                    <Input type="number" name="party_id" placeholder="Party ID" required />
                    <Input type="number" name="election_id" placeholder="Election ID" required />
                    <Button type="submit">Register</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddCandidateByAdmin