import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, Key, EyeOff } from "lucide-react";

export const metadata: Metadata = {
    title: "FAQ & Security",
    description: "Learn about the security, privacy, and architecture of Ballotic.",
};

const faqItems = [
    {
        id: "item-1",
        icon: <Shield className="text-primary shrink-0" size={20} />,
        question: "How is my vote secured using Web3?",
        answer: "Ballotic employs a hybrid anchoring framework. Every vote cast calculates a SHA-256 cryptographic signature that includes the voter ID, candidate ID, election ID, timestamp, and the mathematical hash of the previous vote. This creates a chronological cryptographic ledger. The root hash of this vote ledger is periodically anchored to a public Layer 2 blockchain network (such as Arbitrum One), making it impossible to alter past databases without breaking the public registry."
    },
    {
        id: "item-2",
        icon: <EyeOff className="text-primary shrink-0" size={20} />,
        question: "Can administrators or other users see who I voted for?",
        answer: "While we maintain a linked transaction ledger to verify database integrity, the database values can be separated using zero-knowledge schemas or off-chain state. The voter ID and candidate ID are mapped inside cryptographically secure hashes. Your voting privacy is a critical priority, and the system separates your voter registration profile from the actual cast ballot hash during tallying."
    },
    {
        id: "item-3",
        icon: <Key className="text-primary shrink-0" size={20} />,
        question: "How do I verify that my vote has not been altered?",
        answer: "When you cast your vote, you receive a public receipt containing the network validator registry details, block number, transaction ID, and the cryptographic hash of your specific vote. You can check the 'Verify Vote Chain' registry audits tool on the landing page, which automatically walks the hash chain in the database to verify that every block references the correct parent hash."
    },
    {
        id: "item-4",
        icon: <HelpCircle className="text-primary shrink-0" size={20} />,
        question: "How does district-based registration filter my ballot?",
        answer: "Elections are configured by administrative boards and assigned to specific district or ward locations. When you log in, your voter registration profile resolves your district. The Elections portal dynamically queries only those ballots relevant to your home ward, or nationwide ballots with no location constraints."
    }
];

export default function FAQsPage() {
    return (
        <main className="w-full flex items-center min-h-screen flex-col pt-28 px-4 md:px-8 pb-12 z-10 relative">
            <div className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3">
                    <HelpCircle size={36} className="text-primary" /> FAQ & Security Audits
                </h1>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    Understand the cryptographic framework, voter privacy protections, and database verification techniques powering the Ballotic stand-alone system.
                </p>
            </div>

            <div className="w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 border border-border/40 shadow-xl">
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                        <AccordionItem className="border-b border-border/30 py-2" key={item.id} value={item.id}>
                            <AccordionTrigger className="w-full text-base font-semibold text-start hover:no-underline hover:text-primary transition duration-200">
                                <div className="flex items-center gap-3 pr-4">
                                    {item.icon}
                                    <span>{item.question}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pl-8 pt-2">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </main>
    );
}