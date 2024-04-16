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
  };


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
            <TableHead className="text-center">Action</TableHead>
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
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger><IoIosOptions /></DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-300 text-black">

                      {/* <DropdownMenuItem> */}
                      {/* {<Dialog>
                        <DialogTrigger>Open</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog> */}
                      {/* </DropdownMenuItem> */}

                      <DropdownMenuItem onClick={() => deleteElection(i.election_id)}>Delete</DropdownMenuItem>

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
