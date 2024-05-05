// components/EmailForm.tsx
"use client"

import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useRouter } from 'next/navigation';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.text();
        alert(data);
        // router.push('/verify-otp');
    };
    return (
        <div className='flex justify-center items-center pt-24 flex-col gap-5'>
            <h1>Email OTP Verification</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <button type="submit">Send OTP</button>
            </form>
        </div>
    );
};

export default EmailForm;
