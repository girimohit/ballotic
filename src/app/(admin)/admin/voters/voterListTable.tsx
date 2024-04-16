"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { IoIosOptions } from "react-icons/io";
import UpdateDialog from "./updateVoterDialog";
import { Button } from "@/components/ui/button";

export default function VoterTable() {
    const [voterlist, setVoterlist] = useState<any[]>([]);

    const fetchVoterData = async () => {
        try {
            const response = await fetch("/api/admin/voterList");
            const data = await response.json();
            console.log("Voter list data ; ");
            console.log(data.voterList);
            setVoterlist(data.voterList);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchVoterData();
    }, []);

    const deleteVoter = async (voterID: number) => {
        alert("Confirm Delete?");
        const response = await fetch("/api/admin/voterList", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                voter_id: voterID,
            }),
        });
    };

    return (
        <>
            <Table>
                {/* <TableCaption>VOTER LIST.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">VoterID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-8">Email</TableHead>
                        <TableHead className="text-center">Ward Number</TableHead>
                        <TableHead className="text-center">District</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {voterlist &&
                        voterlist.map((i) => (
                            <TableRow key={i.voter_id}>
                                <TableCell className="text-center px-4 font-medium">{i.voter_id}</TableCell>
                                <TableCell>{i.username}</TableCell>
                                <TableCell>{i.email}</TableCell>
                                <TableCell className="text-center">{i.ward_number}</TableCell>
                                <TableCell className="text-center">{i.district_name}</TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <IoIosOptions />
                                        </DropdownMenuTrigger>
                                        {/* <DropdownMenuContent className="bg-gray-300 text-black"> */}
                                        <DropdownMenuContent>
                                            <UpdateDialog user={i} />
                                            <DropdownMenuSeparator />
                                            <Button className="border-none" variant="outline" onClick={() => deleteVoter(i.voter_id)}>Delete</Button>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
