import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';

interface AvatarName {
    name: string
}

export default function AvatarComponent({ name }: AvatarName) {
    return (
        <>
            <div className="flex flex-col items-center gap-3">
                <Avatar className="size-32">
                    {/* <AvatarImage src="https://githb.com/shadcn.png" /> */}
                    <AvatarImage src="/user.png" />
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <p>{name}</p>
            </div>
        </>
    )
}



