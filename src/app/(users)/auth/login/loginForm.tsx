"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await signIn('credentials', {
            name: lowercaseData['username'],
            password: lowercaseData['pass'],
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

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-16 p-11 dark:border border dark:border-white border-black rounded-2xl">
                <h1>Login Form</h1>
                <input type="text" name="username" required placeholder="Username" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="password" name="pass" required placeholder="Password" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <Button type="submit">Login</Button>
                {/* {error && <p className="text-red-500">{error}</p>} */}
                <span>Dont have an Account?
                    <Link href="/auth/register" className="text-blue-500 hover:text-blue-700"> Register</Link>
                </span>
            </form>
        </>
    );
}
