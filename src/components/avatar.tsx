import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';

interface AvatarName {
    name: string
}

export default function AvatarComponent({ name }: AvatarName) {
    return (
        <>
            <div className="flex flex-col items-center gap-3 flex-wrap">
                <Avatar className="md:size-32 size-16">
                    {/* <AvatarImage src="https://githb.com/shadcn.png" /> */}
                    <AvatarImage src="/user.png" />
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <p className="flex flex-wrap" >{name}</p>
            </div>
        </>
    )
}



