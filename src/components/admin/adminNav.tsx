"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, LayoutDashboard, Users, UserSquare, CalendarDays, HelpCircle, ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

const AdminNavbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/voters", label: "Manage Voters", icon: Users },
        { href: "/admin/manage_candidate", label: "Manage Candidates", icon: UserSquare },
        { href: "/admin/manage_election", label: "Manage Elections", icon: CalendarDays },
        { href: "/faqs", label: "Additional Queries", icon: HelpCircle },
    ];

    return (
        <aside className="w-80 h-full bg-[#030303] flex flex-col justify-between p-6 border-r border-border/20 z-20">
            <div className="flex flex-col gap-8">
                {/* Logo Section */}
                <div className="flex items-center gap-2 px-2 py-4">
                    <Vote size={28} className="text-primary animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tight text-foreground">Ballotic</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Admin Panel</span>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        Control Menu
                    </span>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                }`}
                            >
                                <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground"} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="flex flex-col gap-4 border-t border-border/20 pt-6">
                {session?.user && (
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm uppercase">
                            {session.user.name?.[0] || "A"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground capitalize truncate max-w-[150px]">
                                {session.user.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">System Administrator</span>
                        </div>
                    </div>
                )}
                
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border/40 hover:bg-muted/40 text-xs font-bold text-muted-foreground hover:text-foreground transition-all duration-150"
                >
                    <ArrowLeft size={14} /> Exit Panel
                </Link>
            </div>
        </aside>
    );
};

export default AdminNavbar;
