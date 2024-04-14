"use client";

import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

export default function RegisterVoterForm() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                age: formData.get('age'),
            }),
        });
        console.log(response);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-16 p-11 border border-white rounded-2xl ">
                <h1>Register Form</h1>
                <input type="text" name="name" placeholder="Name" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <input type="text" name="age" placeholder="Age" className="bg-transparent border-b border-gray-300 focus:border-none p-2" />
                <Button type="submit">Register</Button>
            </form>
        </>
    )
}