// pages/verify-otp.tsx
"use client"

import { useState } from 'react';

const VerifyOTP = () => {
    const [otp, setOTP] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Call API to verify OTP
        // Add your logic here
    };

    return (
        <div className='flex justify-center items-center pt-24'>
            <h1>Verify OTP</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} placeholder="Enter OTP" required />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default VerifyOTP;
