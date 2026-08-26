"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent } from "react";
import { Input } from "@/components/ui/input"

const AddCandidateByAdmin = () => {
    const handleAddCandidateByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const candidate_name = String(formData.get('candidate_name') || '').trim();
        const candidate_email = String(formData.get('candidate_email') || '').trim().toLowerCase();
        const party_id = String(formData.get('party_id') || '');
        const election_id = String(formData.get('election_id') || '');

        const response = await fetch("/api/admin/candidateList", {
            method: "POST",
            body: JSON.stringify({
                candidate_name,
                candidate_email,
                party_id,
                election_id,
            }),
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Candidate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader />
                <form onSubmit={handleAddCandidateByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1 className="text-lg font-bold">Register Candidate</h1>
                    <Input type="text" name="candidate_name" placeholder="Name" required />
                    <Input type="email" name="candidate_email" placeholder="Email" required />
                    <Input type="number" name="party_id" placeholder="Party ID" required />
                    <Input type="number" name="election_id" placeholder="Election ID" required />
                    <Button type="submit">Register Candidate</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddCandidateByAdmin;