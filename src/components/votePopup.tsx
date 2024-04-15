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
import { Button } from "./ui/button";

interface Candidate {
  candidate_id: number;
  candidate_name: string;
  party_name: string;
}

export default function VotePopup({ candidates }: { candidates: Candidate[] }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="bg-white text-black p-1 px-2 rounded-lg ">Vote Now</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Choose a Candidate</AlertDialogTitle>
            <AlertDialogDescription className="uppercase">
              {candidates &&
                candidates.map((i) => (
                  <div key={i.candidate_id} className="text-lg">
                    <br />
                    <input type="radio" id={`radio-${i.candidate_id}`} name="candidate" value={i.candidate_id} />
                    <label htmlFor={`radio-${i.candidate_id}`}> {i.candidate_name}</label>

                  </div>
                ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}



















// export default function VotePopup({ candidates }: { candidates: Candidate[] }) {
//   return (
//     <>
//       <AlertDialog>
//         <AlertDialogTrigger className="bg-white text-black p-1 px-2 rounded-lg ">Vote Now</AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-2xl">Choose a Candidate</AlertDialogTitle>
//             <AlertDialogDescription>
//               {candidates &&
//                 candidates.map((i) => (
//                   <div key={i.candidate_id} className="text-lg">
//                     <input type="radio" id={`radio-${i.candidate_id}`} name="candidate" value={i.candidate_id} />
//                     <label htmlFor={`radio-${i.candidate_id}`}> {i.candidate_name}</label>
//                   </div>
//                 ))}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction>Vote</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }
