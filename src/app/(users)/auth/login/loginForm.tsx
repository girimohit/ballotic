"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { KeyRound, User, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = String(formData.get('username') || '').trim().toLowerCase();
        const password = String(formData.get('pass') || ''); // DO NOT LOWERCASE PASSWORD

        try {
            const response = await signIn('credentials', {
                name: username,
                password: password,
                redirect: false,
            });

            if (response?.error) {
                setError('Invalid username or password');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-border/40 shadow-2xl relative z-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Welcome Back</h1>
                <p className="text-muted-foreground text-sm mt-2">Sign in to access your secure election ballot</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                    <div className="flex items-center gap-2 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-3">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                        type="text" 
                        name="username" 
                        required 
                        placeholder="Username" 
                        className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground" 
                    />
                </div>

                <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                        type="password" 
                        name="pass" 
                        required 
                        placeholder="Password" 
                        className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground" 
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl font-semibold mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Authenticating...
                        </>
                    ) : 'Sign In'}
                </Button>

                <div className="text-center text-sm text-muted-foreground mt-4">
                    {"Don't have an account? "}
                    <Link href="/auth/register" className="text-primary hover:underline font-medium">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}