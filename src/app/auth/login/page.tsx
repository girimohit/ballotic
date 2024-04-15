import { getServerSession } from "next-auth"
import LoginForm from "./loginForm"
import { redirect } from "next/navigation";

export default async function LoginVoter() {
    const session = await getServerSession();
    if (session) {
        console.log("Login secssion redirected");
        redirect('/')
    }
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                <div>LoginVoter</div>
                <LoginForm />
            </main >
        </>
    )
}