import CandidatesList from "@/components/CandidatesList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex items-center min-h-screen flex-col pt-14">
        <div id="hero-section">
          <Image src={"/hero_image.png"} alt="Hero Image" width={600} height={600}></Image>
        </div>
        <h1 className="text-3xl">Welcome to Voting Management System</h1>
        <CandidatesList />
      </main>
      <footer className="w-full h-56 bg-white flex gap-36 justify-center">Links Contact Social Media</footer>
    </>
  );
}
