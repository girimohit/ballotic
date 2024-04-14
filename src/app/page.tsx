// 'use client';
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {
//   const [fetchVoter, setFetchVoter] = useState<any[]>([]);

//   const fetchVoterData = async () => {
//     const response = await fetch('/api/candidates');
//     const data = await response.json();
//     setFetchVoter(data);
//   }

//   return (
//     <>
//       <main className="flex items-center min-h-screen flex-col pt-24">
//         <h1 className="text-3xl">Welcome to Voting Management System</h1>
//         <button onClick={fetchVoterData}>
//           All voters
//         </button>

//         {/* Render the Fetched Voters */}
//         {fetchVoter && (
//           <div>
//             {fetchVoter.map(item => (
//               <div key={item.id}>
//                 <p>{item.name}</p>
//               </div>
//             ))}
//           </div>
//         )}

//       </main>
//       <footer className="w-full h-56 bg-white flex gap-36 justify-center">
//         Links
//         Contzct
//         Social Media
//       </footer>

//     </>
//   );
// }

import CandidatesList from "@/components/CandidatesList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex items-center min-h-screen flex-col pt-24">
        <h1 className="text-3xl">Welcome to Voting Management System</h1>
        <CandidatesList />
      </main>
      <footer className="w-full h-56 bg-white flex gap-36 justify-center">Links Contact Social Media</footer>
    </>
  );
}
