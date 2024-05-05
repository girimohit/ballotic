// "use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                {/* <h1>Dashboard Page. Cant access without login</h1> */}
                <div className="flex gap-5 w-full px-8">
                    <Card className="w-[30%] dark:bg-white/5">
                        <CardHeader>
                            <CardTitle>Voter Registered</CardTitle>
                            <CardDescription>Card Description <br />45,500+ </CardDescription>
                        </CardHeader>
                        {/* <CardContent>
                        <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                    </Card>

                    <Card className="w-[30%] backdrop-blur-[20px] bg-gray-400/20 dark:bg-gray-900/20 ">
                        <CardHeader>
                            <CardTitle>Voter Registered</CardTitle>
                            <CardDescription>Card Description <br />45,500+ </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[30%] dark:bg-[#1b1b20]">
                        <CardHeader>
                            <CardTitle>Voter Registered</CardTitle>
                            <CardDescription>Card Description <br />45,500+ </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[30%] bg-black/30">
                        <CardHeader>
                            <CardTitle>Voter Registered</CardTitle>
                            <CardDescription>Card Description <br />45,500+ </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

            </main>
        </>
    )
}