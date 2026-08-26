"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

const AddElectionByAdmin = () => {
    const handleAddElectionByAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const election_name = String(formData.get('election_name') || '').trim();
        const start_date = String(formData.get('start_date') || '');
        const end_date = String(formData.get('end_date') || '');
        const ward_num = String(formData.get('ward_number') || '');
        const district_id = String(formData.get('district_id') || '');

        const response = await fetch("/api/admin/electionList", {
            method: "POST",
            body: JSON.stringify({
                election_name,
                start_date,
                end_date,
                ward_num,
                district_id,
            }),
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none">Add Election</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader />
                <form onSubmit={handleAddElectionByAdmin} className="flex flex-col gap-4 items-center p-6 ">
                    <h1 className="text-lg font-bold">List Election</h1>
                    <Input type="text" name="election_name" placeholder="Election Name" required />
                    <Input type="datetime-local" name="start_date" />
                    <Input type="date" name="end_date" required />
                    <Input type="text" name="ward_number" placeholder="Ward Number" required />
                    <Input type="text" name="district_id" placeholder="District ID" required />
                    <Button type="submit">Register Election</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default AddElectionByAdmin;