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
                <h1>Dashboard Page. Cant access without login</h1>
                <Card className="w-[30%]">
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

            </main>
        </>
    )
}