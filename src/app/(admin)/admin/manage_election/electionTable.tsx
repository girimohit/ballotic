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

export default function ElectionTable() {
  const [electionlist, setElectionlist] = useState<any[]>([]);

  const fetchElectionData = async () => {
    try {
      const response = await fetch('/api/admin/electionList');
      const data = await response.json();
      setElectionlist(data.electionList);
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    fetchElectionData();
  }, []);

  return (
    <>
      <Table>
        {/* <TableCaption>VOTER LIST.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-16">ElectionID</TableHead>
            <TableHead>Election Name</TableHead>
            <TableHead className="">Ward Name</TableHead>
            <TableHead className="text-left">District Name</TableHead>
            {/* <TableHead className="text-left">Election Name</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {electionlist && (
            electionlist.map(i => (


              <TableRow key={i.voter_id}>
                <TableCell className="text-center px-2 font-medium">{i.election_id}</TableCell>
                <TableCell>{i.election_name}</TableCell>
                <TableCell>{i.ward_name}</TableCell>
                <TableCell className="text-left">{i.district_name}</TableCell>
                {/* <TableCell className="text-left">{i.election_name}</TableCell> */}
              </TableRow>
            ))
          )
          }
        </TableBody>
      </Table>
    </>
  )
}
