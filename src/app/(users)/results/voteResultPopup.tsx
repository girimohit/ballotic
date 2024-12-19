"use client";
import { ChangeEvent, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Candidate {
  candidate_id: number;
  candidate_name: string;
  party_name: string;
}

export default function VoteResultPopup({ candidates, electionID, isElectionLive }: { candidates: Candidate[]; electionID: number; isElectionLive: boolean }) {
  const [winner, setWinner] = useState<string>('');

  const handleResult = async () => {
    const electionRes = await fetch(`api/elections/result/${electionID}`);
    const data = await electionRes.json();
    const voteCountCandidate1 = data.electionRes[0].vote_count
    const voteCountCandidate2 = data.electionRes[1].vote_count
    const winnerName = voteCountCandidate1 > voteCountCandidate2 ? candidates[0].candidate_name : candidates[1].candidate_name;
    setWinner(winnerName);
  }

  return (
    <>
      {/* Popup for Results */}
      <AlertDialog>
        <AlertDialogTrigger onClick={handleResult} className="dark:bg-white dark:text-black bg-black text-white p-1 px-2 rounded-lg " >Result</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Winner</AlertDialogTitle>
            <AlertDialogDescription className="uppercase">
              {`Winner : ${winner}`}
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