"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Logout({ name }: { name: string }) {
    return (
        <>
            <Button onClick={() => { signOut(); }} className="flex border rounded-2xl">
                {name} <LogOut />
            </ Button>
            {/* <Button onClick={() => {
                signOut();
            }} >{name} <Logout /></Button> */}
        </>
    )
}