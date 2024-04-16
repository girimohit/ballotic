"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";

export default function VoterTable() {
    const [voterlist, setVoterlist] = useState<any[]>([]);

    const fetchVoterData = async () => {
        try {
            const response = await fetch('/api/admin/voterList');
            const data = await response.json();
            console.log("Voter list data ; ")
            console.log(data.voterList)
            setVoterlist(data.voterList);
        } catch (error) {
            console.log(error)

        }
    }


    useEffect(() => {
        fetchVoterData();
    }, []);

    return (
        <>
            <Table>
                <TableCaption>VOTER LIST.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">VoterID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-8"  >Email</TableHead>
                        <TableHead className="text-center">Ward Number</TableHead>
                        <TableHead className="text-center">District</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {voterlist && (
                        voterlist.map(i => (


                            <TableRow key={i.voter_id}>
                                <TableCell className="text-center px-4 font-medium">{i.voter_id}</TableCell>
                                <TableCell>{i.username}</TableCell>
                                <TableCell>{i.email}</TableCell>
                                <TableCell className="text-center">{i.ward_number}</TableCell>
                                <TableCell className="text-center">{i.district_name}</TableCell>
                            </TableRow>
                        ))
                    )
                    }
                </TableBody>
            </Table>
        </>
    )
}
