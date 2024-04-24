"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";

export default function RegisterVoterForm() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        //  Create an object to store the lowercase data
        const lowercaseData: { [key: string]: string } = {};

        // Convert each form data value to lowercase
        formData.forEach((value, key) => {
            lowercaseData[key] = String(value).toLowerCase();
        });
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                // name: formData.get('name'),
                name: lowercaseData['name'],
                password: lowercaseData['pass'],
                email: lowercaseData['email'],
                role: lowercaseData['role'],
                ward_num: lowercaseData['ward_number'],
                district_id: lowercaseData['district_id'],
            }),
        });
        if (response.ok) {
            await signIn("credentials", {
                name: lowercaseData['name'],
                password: lowercaseData['pass'],
                redirect: true,
                callbackUrl: "/"
            })
        }
        console.log(response);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-16 p-11 border border-white rounded-2xl ">
                <h1>Register Form</h1>
                <input type="text" name="name" placeholder="Name" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="password" name="pass" placeholder="Password" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="email" name="email" placeholder="Email" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="text" name="role" placeholder="Role" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="number" name="ward_number" placeholder="ward_number" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="number" name="district_id" placeholder="District ID" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <Button type="submit">Register</Button>
                <span>Already have an Account?
                    <Link href="/auth/login" className="text-blue-500 hover:text-blue-700"> Login</Link>
                </span>
            </form>
        </>
    )
}