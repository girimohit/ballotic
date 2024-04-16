"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";


export default function Logout() {
    return (
        <>
            <span onClick={() => {
                signOut();
            }} className="flex">
                Logout <LogOut />
            </span >
        </>
    )
}