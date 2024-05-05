"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NodemailerTransporter from '@/app/api/send-otp/emailTransporter';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        setEmail(lowercaseData['email']);
        setUsername(lowercaseData['username']);
        const response = await signIn('credentials', {
            name: lowercaseData['username'],
            password: lowercaseData['pass'],
            email: lowercaseData['email'],
            otp: lowercaseData['otp'],
            redirect: true,
            callbackUrl: "/"  //this will redirect after login
        });
        console.log("Response of the SignIn from loginform.tsx : ");
        console.log({ response });
        if (!response?.error) {
            // router.push('/faqs');
            router.refresh();     //redirect after signin, but won't work
        } else {
            const error = 'Invalid credentials';
        }
    }


    const sendOtpHandle = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, username: username }),
        });

        const data = await response.text();
        alert(data);
        setOtpSent(true);
    };

    // const sendOtpHandle = async () => {
    //     NodemailerTransporter(email);
    // }


    return (
        <>
            {username}
            {email}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-16 p-11 dark:border border dark:border-white border-black rounded-2xl">
                <h1>Login Form</h1>
                <input onChange={(e) => setUsername(e.target.value.trim())} type="text" name="username" required placeholder="Username" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="password" name="pass" required placeholder="Password" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input onChange={(e) => setEmail(e.target.value.trim())} type="email" name="email" required placeholder="Email" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                {otpSent &&
                    <input type="number" name="otp" required placeholder="Username" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                }
                <button className='text-blue-500 hover:text-blue-700' onClick={sendOtpHandle} disabled={otpSent} >send otp</button>
                <Button type="submit">Login</Button>
                <span>Dont have an Account?
                    <Link href="/auth/register" className="text-blue-500 hover:text-blue-700"> Register</Link>
                </span>
            </form>
        </>
    );
}
