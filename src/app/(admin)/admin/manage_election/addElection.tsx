"use client";
import RegisterVoterForm from "@/app/(users)/auth/register/registerForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

const AddElectionByAdmin = () => {
    const handleAddElectionByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        //  Create an object to store the lowercase data
        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch("http://localhost:3000/api/admin/electionList", {
            method: "POST",
            body: JSON.stringify({
                // name: formData.get('name'),
                election_name: lowercaseData["election_name"],
                start_date: lowercaseData["start_date"],
                end_date: lowercaseData["end_date"],
                ward_num: lowercaseData["ward_number"],
                district_id: lowercaseData["district_id"],
            }),
        });
        // if (response.ok) {
        //     redirect("/");
        // }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Election</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>{/* <DialogTitle>Edit profile</DialogTitle> */}</DialogHeader>
                <form onClick={handleAddElectionByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1>List Election</h1>
                    <Input type="text" name="election_name" placeholder="Election Name" required />
                    <Input type="datetime-local" name="start_date" />
                    <Input type="date" name="end_date" required />
                    <Input type="text" name="ward_number" placeholder="Ward Number" required />
                    <Input type="text" name="district_id" placeholder="District ID" required />
                    <Button type="submit">Register</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default AddElectionByAdmin;
