import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");
  
  // Dynamically import db modules after environment variables are loaded
  const { db } = await import("../src/db");
  const { districts, wards, voters, parties, elections, candidates, votes } = await import("../src/db/schema");

  const hashedPassword = bcrypt.hashSync("baL@otic", 10);

  // Wipe existing tables in dependency order
  console.log("Cleaning up existing database records...");
  await db.delete(votes); // Clear votes first to break foreign key references
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

  // 5. Seed Elections (Include national global elections and district municipal elections)
  const electionList = await db.insert(elections).values([
    { 
      electionName: "Connaught Place Ward Election 2026", 
      endDate: "2026-12-31", 
      wardNumber: 101, 
      districtId: delhiId, 
      currentStatus: true 
    },
    { 
      electionName: "Andheri West Local Election 2026", 
      endDate: "2026-12-31", 
      wardNumber: 201, 
      districtId: mumbaiId, 
      currentStatus: true 
    },
    { 
      electionName: "Lok Sabha General Elections 2026", 
      endDate: "2026-12-31", 
      wardNumber: null, 
      districtId: null, 
      currentStatus: true 
    },
    { 
      electionName: "Chanakyapuri Municipal Council Election 2026", 
      endDate: "2026-12-31", 
      wardNumber: 102, 
      districtId: delhiId, 
      currentStatus: true 
    },
    { 
      electionName: "Indiranagar Ward Civic Body Election 2026", 
      endDate: "2026-12-31", 
      wardNumber: 301, 
      districtId: blrId, 
      currentStatus: true 
    },
    { 
      electionName: "Bandra East Legislative Seat Election 2026", 
      endDate: "2026-12-31", 
      wardNumber: 202, 
      districtId: mumbaiId, 
      currentStatus: true 
    }
  ]).returning();
  console.log("Elections seeded:", electionList);

  const connaughtElectionId = electionList[0].electionId;
  const andheriElectionId = electionList[1].electionId;
  const lokSabhaElectionId = electionList[2].electionId;
  const chanakyaElectionId = electionList[3].electionId;
  const indiraElectionId = electionList[4].electionId;
  const bandraElectionId = electionList[5].electionId;

  // 6. Seed Candidates
  await db.insert(candidates).values([
    // Candidates for Connaught Place Ward Election
    { name: "Rajesh Kumar", partyId: bjpId, electionId: connaughtElectionId, email: "rajesh@bjp.in" },
    { name: "Sanjay Singh", partyId: aapId, electionId: connaughtElectionId, email: "sanjay@aap.in" },
    
    // Candidates for Andheri West Local Election
    { name: "Amit Patel", partyId: bjpId, electionId: andheriElectionId, email: "amit@bjp.in" },
    { name: "Sunita Deshmukh", partyId: incId, electionId: andheriElectionId, email: "sunita@inc.in" },

    // Candidates for Lok Sabha General Elections (National)
    { name: "Narendra Modi", partyId: bjpId, electionId: lokSabhaElectionId, email: "modi@bjp.in" },
    { name: "Rahul Gandhi", partyId: incId, electionId: lokSabhaElectionId, email: "rahul@inc.in" },
    { name: "Arvind Kejriwal", partyId: aapId, electionId: lokSabhaElectionId, email: "kejriwal@aap.in" },

    // Candidates for Chanakyapuri Municipal Council Election
    { name: "Meenakshi Lekhi", partyId: bjpId, electionId: chanakyaElectionId, email: "meenakshi@bjp.in" },
    { name: "Ajay Maken", partyId: incId, electionId: chanakyaElectionId, email: "maken@inc.in" },

    // Candidates for Indiranagar Ward Civic Body Election
    { name: "Tejasvi Surya", partyId: bjpId, electionId: indiraElectionId, email: "surya@bjp.in" },
    { name: "Sowmya Reddy", partyId: incId, electionId: indiraElectionId, email: "sowmya@inc.in" },

    // Candidates for Bandra East Legislative Seat Election
    { name: "Ashish Shelar", partyId: bjpId, electionId: bandraElectionId, email: "shelar@bjp.in" },
    { name: "Zeeshan Siddique", partyId: incId, electionId: bandraElectionId, email: "zeeshan@inc.in" }
  ]);
  console.log("Candidates seeded.");

  console.log("Database seeded successfully with expanded datasets!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
