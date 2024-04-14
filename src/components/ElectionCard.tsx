"use client";

import { useState, useEffect } from "react";
import Image from "next/image"
import { Button } from "./ui/button"
import AvatarComponent from "./avatar"
import VotePopup from "./votePopup"

const candidates = [
    { id: 1, name: "Candidate A" },
    { id: 2, name: "Candidate B" },
    { id: 3, name: "Candidate C" },
];

export default function ElectionCard() {
    const [election, setElection] = useState<any[]>([]);

    const fetchElectionData = async () => {
        try {
            const electionResponse = await fetch('/api/elections')
            const data = await electionResponse.json();
            setElection(data.elections)
        } catch (error) {
            console.log("Error fetching election data")
        }
    }

    useEffect(() => {
        fetchElectionData();
    }, []);

    return (
        <>
            {/* <Button onClick={fetchElectionData} >Election</Button> */}
            {
                election && election.map(i => (
                    <div key={i.ElectionID} className="flex flex-col bg-gray-200 dark:bg-black rounded-3xl p-8 w-80 h-max md:w-[50%]  my-6 border border-gray-300 dark:border-gray-600 relative ">
                        <h2 className="text-center text-3xl">{i.ElectionName}</h2>
                        <div className="flex justify-around p-16  items-center">
                            {/* <Image src="/election-banner.jpg" alt="Election Banner" width={200} height={100} className="rounded-t-lg" /> */}
                            <AvatarComponent name="Candidate A" />

                            <h1 className="text-3xl">vs</h1>
                            <AvatarComponent name="Candidate B" />
                            {/* <Image src="/election-banner.jpg" alt="Election Banner" width={200} height={100} className="rounded-t-lg" /> */}
                        </div>
                        <div className=" flex justify-between">
                            <div className=" bottom-7 left-7">
                                {/* <p>{i.StartDate}</p> */}
                                <p>{i.EndDate}</p>
                            </div>
                            <div className=" right-7 bottom-7 flex items-center flex-col gap-2">
                                {/* <button className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-sm">Vote Now</button> */}
                                {/* <Button>Vote Now</Button> */}
                                <VotePopup candidates={candidates} />
                                <h5 className="text-green-400">Live</h5>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

