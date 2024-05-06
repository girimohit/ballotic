"use client";

import { ChangeEvent, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Candidate {
  candidate_id: number;
  candidate_name: string;
  party_name: string;
}

export default function VotePopup({ candidates, electionID, isElectionLive }: { candidates: Candidate[]; electionID: number; isElectionLive: boolean }) {
  const [winner, setWinner] = useState<string>('');
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const handleCandidateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCandidate(parseInt(event.target.value));
  };

  const handleVote = async () => {
    const voterRes = await fetch("api/loggedinUser");
    const voterData = await voterRes.json();
    const voterID = voterData.loggedInUser[0].voter_id;
    try {
      if (selectedCandidate !== null) {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate_id: selectedCandidate,
            election_id: electionID,
            voter_id: voterID,
          }),
        });
        console.log(response.json());
      }
    } catch (error) { }
  };

  return (
    <>
      <AlertDialog>
        {isElectionLive ?
          (<AlertDialogTrigger className="bg-[#cc1b42] text-white p-1 px-2 rounded-lg ">
            Vote Now
          </AlertDialogTrigger>) : null
        }
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Choose a Candidate</AlertDialogTitle>
            <AlertDialogDescription className="uppercase">
              {candidates &&
                candidates.map((i) => (
                  <div key={i.candidate_id} className="text-lg">
                    <br />
                    <input type="radio" id={`radio-${i.candidate_id}`} name="candidate" value={i.candidate_id} onChange={handleCandidateSelection} />
                    <label htmlFor={`radio-${i.candidate_id}`}> {i.candidate_name}</label>
                  </div>
                ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleVote}>Vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};