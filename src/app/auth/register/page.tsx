import { getServerSession } from "next-auth"
import RegisterVoterForm from "./registerForm"
import { redirect } from "next/navigation";

const RegisterVoter = async () => {
    const session = await getServerSession();
    if (session) {
        redirect('/');
    }
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                <div>RegisterVoter</div>
                <RegisterVoterForm />
            </main>
        </>
    )
}
export default RegisterVoter






