"use client";

import { useState, useEffect } from "react";
import Image from "next/image"
import AvatarComponent from "@/components/avatar";
import VotePopup from "@/components/votePopup";
// import VotePopup from "./votePopup"

const candidates = [
    { candidate_id: 1, candidate_name: "Candidate A", party_name: "BJP" },
    { candidate_id: 2, candidate_name: "Candidate B", party_name: "BJP" },
    { candidate_id: 3, candidate_name: "Candidate C", party_name: "BJP" },
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
                    <div key={i.election_id} className="flex flex-col bg-gray-200 dark:bg-black rounded-3xl md:p-8 md:pb-10 p-5  w-[85%] min-h-fit md:w-[48%]  overflow-hidden my-8 border border-gray-300 dark:border-gray-600 relative drop-shadow-[0_5px_5px_rgba(255,255,255,0.25)]">
                        {i.current_status ?
                            <span className="absolute top-0 left-0 p-2 px-4 text-sm  bg-green-600 rounded-br-3xl" >Live</span>
                            :
                            <span className="absolute top-0 left-0 p-2 px-4 text-sm  bg-red-600 rounded-br-3xl" >End</span>
                        }
                        <h2 className="text-center text-xl md:text-3xl">{i.election_name}</h2>
                        {i.candidates && i.candidates.length > 1 &&
                            <div className="flex justify-around p-3 md:p-8 items-center ">
                                <AvatarComponent name={i.candidates[0].candidate_name || "Candidate1"} />
                                <h1 className="md:text-3xl text-lg">Vs</h1>
                                <AvatarComponent name={i.candidates[1].candidate_name || "Candidate 2"} />
                            </div>
                        }
                        <div className=" flex justify-end md:px-5">
                            {/* <div className=" bottom-7 left-7">
                                <p>{i.StartDate}</p>
                                <p>{i.end_date}</p> 
                            </div> */}
                            <div className=" flex items-center gap-4">
                                <VotePopup candidates={i.candidates} electionID={i.election_id} isElectionLive={i.current_status} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

