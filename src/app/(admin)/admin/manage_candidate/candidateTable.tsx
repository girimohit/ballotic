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

export default function CandidateTable() {
  const [candidatelist, setCandidatelist] = useState<any[]>([]);

  const fetchCandidateData = async () => {
    try {
      const response = await fetch('/api/admin/candidateList');
      const data = await response.json();
      setCandidatelist(data.candidateList);
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    fetchCandidateData();
  }, []);

  return (
    <>
      <Table>
        {/* <TableCaption>VOTER LIST.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">CandidateID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-8">Email</TableHead>
            <TableHead className="text-left">Party Name</TableHead>
            <TableHead className="text-left">Election Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidatelist && (
            candidatelist.map(i => (


              <TableRow key={i.voter_id}>
                <TableCell className="text-center px-2 font-medium">{i.candidate_id}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.email}</TableCell>
                <TableCell className="text-left">{i.party_name}</TableCell>
                <TableCell className="text-left">{i.election_name}</TableCell>
              </TableRow>
            ))
          )
          }
        </TableBody>
      </Table>
    </>
  )
}
