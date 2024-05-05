// components/EmailForm.tsx
"use client"

import { useState } from 'react';

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
    };
    return (
        <div className='flex justify-center items-center pt-24 flex-col gap-5 min-h-screen'>
            {/* <h1>Email OTP Verification</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <button type="submit">Send OTP</button>
            </form>
            {email} */}
        </div>
    );
};

export default EmailForm;
