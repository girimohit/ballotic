import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");
  
  // Dynamically import db modules after environment variables are loaded
  const { db } = await import("../src/db");
  const { districts, wards, voters, parties, elections, candidates } = await import("../src/db/schema");

  const hashedPassword = bcrypt.hashSync("baL@otic", 10);

  // Wipe existing tables in dependency order
  console.log("Cleaning up existing database records...");
  await db.delete(candidates);
  await db.delete(elections);
  await db.delete(parties);
  await db.delete(voters);
  await db.delete(wards);
  await db.delete(districts);

  // 1. Seed Districts
  const districtList = await db.insert(districts).values([
    { districtName: "New Delhi" },
    { districtName: "Mumbai Suburban" },
    { districtName: "Bengaluru Urban" },
  ]).returning();
  console.log("Districts seeded:", districtList);

  const delhiId = districtList[0].districtId;
  const mumbaiId = districtList[1].districtId;
  const blrId = districtList[2].districtId;

  // 2. Seed Wards
  await db.insert(wards).values([
    { wardNumber: 101, wardName: "Connaught Place", districtId: delhiId },
    { wardNumber: 102, wardName: "Chanakyapuri", districtId: delhiId },
    { wardNumber: 201, wardName: "Andheri West", districtId: mumbaiId },
    { wardNumber: 202, wardName: "Bandra East", districtId: mumbaiId },
    { wardNumber: 301, wardName: "Indiranagar", districtId: blrId },
    { wardNumber: 302, wardName: "Koramangala", districtId: blrId },
  ]);
  console.log("Wards seeded.");

  // 3. Seed Voters
  await db.insert(voters).values([
    { username: "mohit", password: hashedPassword, email: "mohit@example.in", role: "admin", wardNumber: 101, districtId: delhiId },
    { username: "aravind", password: hashedPassword, email: "aravind@example.in", role: "voter", wardNumber: 101, districtId: delhiId },
    { username: "priya", password: hashedPassword, email: "priya@example.in", role: "voter", wardNumber: 201, districtId: mumbaiId },
    { username: "rahul", password: hashedPassword, email: "rahul@example.in", role: "voter", wardNumber: 301, districtId: blrId },
  ]);
  console.log("Voters seeded.");

  // 4. Seed Parties
  const partyList = await db.insert(parties).values([
    { partyName: "Bharatiya Janata Party (BJP)", partyLeader: "J.P. Nadda" },
    { partyName: "Indian National Congress (INC)", partyLeader: "Mallikarjun Kharge" },
    { partyName: "Aam Aadmi Party (AAP)", partyLeader: "Arvind Kejriwal" },
  ]).returning();
  console.log("Parties seeded:", partyList);

  const bjpId = partyList[0].partyId;
  const incId = partyList[1].partyId;
  const aapId = partyList[2].partyId;

  // 5. Seed Elections
  const electionList = await db.insert(elections).values([
    { electionName: "Connaught Place Ward Election 2026", endDate: "2026-12-31", wardNumber: 101, districtId: delhiId, currentStatus: true },
    { electionName: "Andheri West Local Election 2026", endDate: "2026-12-31", wardNumber: 201, districtId: mumbaiId, currentStatus: true },
  ]).returning();
  console.log("Elections seeded:", electionList);

  const election1Id = electionList[0].electionId;
  const election2Id = electionList[1].electionId;

  // 6. Seed Candidates
  await db.insert(candidates).values([
    { name: "Rajesh Kumar", partyId: bjpId, electionId: election1Id, email: "rajesh@bjp.in" },
    { name: "Sanjay Singh", partyId: aapId, electionId: election1Id, email: "sanjay@aap.in" },
    { name: "Amit Patel", partyId: bjpId, electionId: election2Id, email: "amit@bjp.in" },
    { name: "Sunita Deshmukh", partyId: incId, electionId: election2Id, email: "sunita@inc.in" },
  ]);
  console.log("Candidates seeded.");

  console.log("Database seeded successfully!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
