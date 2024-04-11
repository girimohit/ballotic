import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex items-center min-h-screen flex-col pt-24">
        <h1 className="text-3xl">Welcome to Voting Management System</h1>
      </main>
      <footer className="w-full h-56 bg-white flex gap-36 justify-center">
        Links
        Contzct
        Social Media
      </footer>
    </>

  );
}





// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Fetch candidates data from an API endpoint
//     axios.get('/api/candidates')
//       .then(response => {
//         setCandidates(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching candidates:', error);
//       });
//   }, []);

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-8">Welcome to Voting Management System</h1>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {candidates.map(candidate => (
//           <div key={candidate} className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-semibold">{candidate}</h2>
//             <p className="text-gray-600">{candidate}</p>
//             <p className="mt-2">{candidate}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
