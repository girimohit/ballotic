"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { User, KeyRound, Mail, MapPin, Layers, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterVoterForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Dropdown options
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [filteredWards, setFilteredWards] = useState<any[]>([]);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const res = await fetch('/api/districts-wards');
                if (res.ok) {
                    const data = await res.json();
                    setDistricts(data.districts || []);
                    setWards(data.wards || []);
                }
            } catch (err) {
                console.error("Error loading location details:", err);
            }
        };
        fetchLocationData();
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            const distId = parseInt(selectedDistrict);
            setFilteredWards(wards.filter(w => w.districtId === distId));
        } else {
            setFilteredWards([]);
        }
    }, [selectedDistrict, wards]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') || '').trim().toLowerCase();
        const password = String(formData.get('pass') || '');
        const email = String(formData.get('email') || '').trim().toLowerCase();
        const ward_num = String(formData.get('ward_number') || '');
        const district_id = String(formData.get('district_id') || '');

        if (!district_id || !ward_num) {
            setError('Please select a valid district and ward.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    role: 'voter',
                    ward_num,
                    district_id,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Failed to register voter profile.');
                setLoading(false);
                return;
            }

            await signIn("credentials", {
                name,
                password,
                redirect: true,
                callbackUrl: "/"
            });
        } catch (err) {
            setError('An unexpected connection error occurred.');
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-border/40 shadow-2xl relative z-10 my-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create Voter Account</h1>
                <p className="text-muted-foreground text-sm mt-2">Register to participate in cryptographically audited elections</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="flex items-center gap-2 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-3">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Username" 
                            className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground" 
                            required 
                        />
                    </div>

                    <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                            type="password" 
                            name="pass" 
                            placeholder="Password" 
                            className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground" 
                            required 
                        />
                    </div>
                </div>

                <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground" 
                        required 
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <select
                            name="district_id"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground appearance-none"
                            required
                        >
                            <option value="" className="bg-background text-foreground">Select District</option>
                            {districts.map((d) => (
                                <option key={d.districtId} value={d.districtId} className="bg-background text-foreground">
                                    {d.districtName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <select
                            name="ward_number"
                            disabled={!selectedDistrict}
                            className="w-full bg-background/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 text-foreground placeholder:text-muted-foreground disabled:opacity-50 appearance-none"
                            required
                        >
                            <option value="" className="bg-background text-foreground">Select Ward</option>
                            {filteredWards.map((w) => (
                                <option key={w.wardNumber} value={w.wardNumber} className="bg-background text-foreground">
                                    {w.wardName} (No. {w.wardNumber})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full py-6 rounded-xl font-semibold mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Registering...
                        </>
                    ) : 'Register Account'}
                </Button>

                <div className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary hover:underline font-medium">
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    );
}
