"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
import { useEffect, useState } from "react";
import UpdateCandidateDialog from "./updateCandidateDialog";
import { Button } from "@/components/ui/button";

export default function CandidateTable() {
  const [candidatelist, setCandidatelist] = useState<any[]>([]);

  const fetchCandidateData = async () => {
    try {
      const response = await fetch("/api/admin/candidateList");
      const data = await response.json();
      setCandidatelist(data.candidateList || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const deleteCandidate = async (candidateID: number) => {
    if (confirm("Confirm Delete?")) {
      const response = await fetch("/api/admin/candidateList", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_id: candidateID,
        }),
      });
      if (response.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">CandidateID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-8">Email</TableHead>
          <TableHead className="text-left">Party Name</TableHead>
          <TableHead className="text-left">Election Name</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidatelist &&
          candidatelist.map((i) => (
            <TableRow key={i.candidate_id}>
              <TableCell className="text-center px-2 font-medium">{i.candidate_id}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell className="text-left">{i.party_name}</TableCell>
              <TableCell className="text-left">{i.election_name}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IoIosOptions />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <UpdateCandidateDialog user={i} />
                    <DropdownMenuSeparator />
                    <Button className="border-none" variant="outline" onClick={() => deleteCandidate(i.candidate_id)}>Delete</Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}