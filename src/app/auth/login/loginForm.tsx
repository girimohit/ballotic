

"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            name: formData.get('name'),
            age: formData.get('age'),
            redirect: false,
        });
        console.log("Response of the SignIn from loginform.tsx : ");
        console.log({ response });
        if (!response?.error) {
            router.push('/auth/register');
            router.refresh();
        } else {
            const error = 'Invalid credentials';
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-16 p-11 border border-white rounded-2xl">
                <h1>Login Form</h1>
                <input type="text" name="name" placeholder="Name" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="text" name="age" placeholder="Age" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <Button type="submit">Login</Button>
                {/* {error && <p className="text-red-500">{error}</p>} */}
            </form>
        </>
    );
}
