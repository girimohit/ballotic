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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosOptions } from "react-icons/io";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateElectionDialog from "./updateElectionDialog";
import { FaWindows } from "react-icons/fa";
import AddElectionByAdmin from "./addElection";
import { Input } from "@/components/ui/input";

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


  const deleteElection = async (electionID: number) => {
    alert("Confirm Delete?");
    const response = await fetch("/api/admin/electionList", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        election_id: electionID,
      }),
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };

  // Search logic 
  const [searchElection, setSearchElection] = useState("");


  return (
    <>
      <div className="flex justify-end gap-5 w-full mb-5" >
        <Input onChange={(e) => setSearchElection(e.target.value.trim())} className="w-64 border-gray-600" placeholder="Search for election" />
        <AddElectionByAdmin />
      </div>
      <br />
      <h1 className="text-3xl font-mono">ELECTIONS</h1>
      <br />
      <Table>
        {/* <TableCaption>VOTER LIST.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-16">ElectionID</TableHead>
            <TableHead>Election Name</TableHead>
            <TableHead className="">Ward Name</TableHead>
            <TableHead className="text-left">District Name</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
            {/* <TableHead className="text-left">Election Name</TableHead> */}
          </TableRow>

        </TableHeader>
        <TableBody>
          {electionlist && (
            electionlist.filter((item) => {
              const resRows = searchElection === ""
                ? item
                : item.election_name.toLowerCase().includes(searchElection.toLowerCase())
                || item.ward_name.toLowerCase().includes(searchElection.toLowerCase())
                || item.district_name.toLowerCase().includes(searchElection.toLowerCase())
                || item.current_status.toString().includes(searchElection.toLowerCase());
              return resRows;
            }).map(i => (
              <TableRow key={i.election_id}>
                <TableCell className="text-center px-2 font-medium">{i.election_id}</TableCell>
                <TableCell>{i.election_name}</TableCell>
                <TableCell>{i.ward_name}</TableCell>
                <TableCell className="text-left">{i.district_name}</TableCell>
                <TableCell className="text-left">{i.current_status}</TableCell>
                {/* <TableCell className="text-left">{i.election_name}</TableCell> */}
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger><IoIosOptions /></DropdownMenuTrigger>
                    <DropdownMenuContent >
                      <UpdateElectionDialog election={i} />
                      <DropdownMenuSeparator />
                      <Button className="border-none" variant="outline" onClick={() => deleteElection(i.election_id)}>Delete</Button>

                      {/* <DropdownMenuItem onClick={() => deleteElection(i.election_id)}>Delete</DropdownMenuItem> */}

                      {/* <DropdownMenuSeparator /> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )
          }
        </TableBody>
      </Table>
    </>
  )
}
