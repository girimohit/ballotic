import CandidatesList from "@/components/CandidatesList";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function Home() {

  return (
    <>
      <main className="flex items-center min-h-screen flex-col pt-14 scroll-smooth">
        <div id="hero-section">
          <Image src={"/hero_image.png"} alt="Hero Image" width={600} height={600}></Image>
        </div>
        <h1 className="text-3xl">Welcome to Voting Management System</h1>

        <CandidatesList />
      </main>
      <footer className="w-full h-56 bg-white text-black flex gap-36 justify-center">Links Contact Social Media</footer>
    </>
  );
}
