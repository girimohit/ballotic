"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Candidate {
  candidate_id: number;
  candidate_name: string;
  party_name: string;
}

export default function VotePopup({ candidates, electionID, isElectionLive }: { candidates: Candidate[]; electionID: number; isElectionLive: boolean }) {


  const [winner, setWinner] = useState<string>('');

  const handleResult = async () => {
    try {
      const electionRes = await fetch("api/elections/result/" + electionID);
      const data = await electionRes.json();
      
      if (!data.electionRes || data.electionRes.length === 0) {
        setWinner("No votes cast yet");
        return;
      }
      
      const voteCountCandidate1 = data.electionRes[0]?.vote_count || 0;
      const voteCountCandidate2 = data.electionRes[1]?.vote_count || 0;
      
      let winnerName = "Tie";
      if (voteCountCandidate1 > voteCountCandidate2) {
        winnerName = candidates[0]?.candidate_name || "Candidate 1";
      } else if (voteCountCandidate2 > voteCountCandidate1) {
        winnerName = candidates[1]?.candidate_name || "Candidate 2";
      }
      setWinner(winnerName);
    } catch (err) {
      console.error(err);
      setWinner("Result pending");
    }
  }


  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const handleCandidateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCandidate(parseInt(event.target.value));
  };

  const handleVote = async () => {
    try {
      const voterRes = await fetch("api/loggedinUser");
      const voterData = await voterRes.json();
      
      if (!voterData.loggedInUser || voterData.loggedInUser.length === 0) {
        alert("Authentication Error: Logged in voter profile not found.");
        return;
      }
      
      const voterID = voterData.loggedInUser[0].voter_id;
      
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
        
        const result = await response.json();
        if (result.success) {
          alert("Vote Cast Successfully!\n\nLedger Audit Receipt:\nNetwork: " + result.receipt.network + "\nBlock Number: " + result.receipt.blockNumber + "\nTx Hash: " + result.receipt.txHash + "\nBallot SHA-256: " + result.vote.hash);
        } else {
          alert("Voting Rejected: " + result.error);
        }
      } else {
        alert("Please select a candidate first.");
      }
    } catch (error) {
      alert("Error: Connection failure or unauthorized session.");
    }
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
                    {/* {electionID} */}
                    <br />
                    <input
                      type="radio"
                      id={"radio-" + i.candidate_id}
                      name="candidate"
                      value={i.candidate_id}
                      onChange={handleCandidateSelection}
                    />
                    <label htmlFor={"radio-" + i.candidate_id}> {i.candidate_name}</label>
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


      {/* Popup for Results */}
      <AlertDialog>
        <AlertDialogTrigger onClick={handleResult} className="dark:bg-white dark:text-black bg-black text-white p-1 px-2 rounded-lg " >Result</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Winner</AlertDialogTitle>
            <AlertDialogDescription className="uppercase">
              {"Winner : " + winner}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction >Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
