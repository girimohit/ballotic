// components/EmailForm.tsx
import { Metadata } from 'next';
import { useState } from 'react';
import ElectionResultCard from './resultCard';

export const metadata: Metadata = {
    title: "Election Results",
    description: "Generated by create next app",
};

export default async function ElectionResults() {
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                < ElectionResultCard />
            </main>

        </>
    )
}






// const EmailForm = () => {
//     const [email, setEmail] = useState('');
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const response = await fetch('/api/send-otp', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: email }),
//         });

//         const data = await response.text();
//         alert(data);
//     };
//     return (
//         <div className='flex justify-center items-center pt-24 flex-col gap-5 min-h-screen'>
//             {/* <h1>Email OTP Verification</h1>
//             <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
//                 <button type="submit">Send OTP</button>
//             </form>
//             {email} */}
//         </div>
//     );
// };

// export default EmailForm;
