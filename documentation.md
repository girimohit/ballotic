# Ballotic Technical Documentation

This file documents the system architecture, database schema, workflow design, and steps of development for the Ballotic secure digital voting platform.

## 1. System Overview & Tech Stack

Ballotic is a digital voting utility enabling voters to cast ballots in configured local district or nationwide elections. The application implements a hybrid security model that links database logs to immutable, mock Web3 block anchoring receipts to secure the data against unauthorized database manipulation.

*   **Frontend**: React, Next.js (version 14.1.4 App Router), Tailwind CSS.
*   **Database**: PostgreSQL hosted via Neon Serverless, managed through Drizzle ORM.
*   **Authentication**: NextAuth.js (JWT strategy, Custom Credentials Provider).
*   **Cryptographic Layer**: Node crypto (SHA-256) linked hash chains.

---

## 2. Database Schema (Drizzle ORM)

The relational schema maps out districts, wards, voters, candidates, parties, elections, results, and votes:

*   **districts**: Unique ID and name.
*   **wards**: Ward number (PK), ward name, and district relation.
*   **voters**: Voter ID (PK), username (UK), email (UK), bcrypt-hashed password, role (voter, admin), ward, and district.
*   **parties**: Party ID, party name, and leader.
*   **candidates**: Candidate ID, name, party relation, election relation, and contact email.
*   **elections**: Election ID, name, date scope, ward, district, and live status.
*   **votes**: Vote ID, voter relation, candidate relation, timestamp, hash, and previous_hash.
*   **election_results**: Result ID, election, candidate, total votes, and percentages.

---

## 3. Core Workflow Integrations

### A. Secure Authentication & Role Management
Passes credentials safely to next-auth. Registration parses user inputs, computes a bcrypt hash of the password, and inserts the row. On login, 'bcrypt.compare' checks credentials. The callbacks store the voter's 'role' and 'id' on the user session object.

### B. Custom Middleware Routing Locks
Configures role checks inside next-auth middleware. Matches requests targeting the '/admin' prefix. If the user session role is not 'admin', it blocks request routing and redirects the visitor to the landing page. Conditional rendering filters navbar displays to only show the Admin tab to administrators.

### C. Hybrid Ledger Cryptographic Chaining
*   When a vote is cast, it queries the database for the last inserted vote row to retrieve its hash.
*   Calculates a SHA-256 string combining voter ID, candidate ID, election ID, timestamp, and previous hash (Genesis hash if first vote).
*   Saves the vote with the generated hash and previous_hash chain links.
*   Simulates anchoring the block hash on Arbitrum One via web3 provider stubs, returning validation receipt details (network, block, txHash).

### D. Guest Ballots Access
An anonymous guest can view all elections. On the client card page, if the session is empty, it hides vote popups and displays a "Log in to Vote" button directing guests to login.

---

## 4. Development Steps & Timeline

1.  **Drizzle Setup**: Configured postgres credentials in drizzle.config.ts and index.ts client connection pool. Defined tables and schemas in src/db/schema.ts.
2.  **Seeding Database**: Created scripts/seed.ts. Integrated @next/env to dynamically load variables and pre-hash seed voter passwords.
3.  **API Migration**: Updated registration, nextauth validation, admin voters, admin candidates, admin elections, loggedInUser, and vote routes to query Postgres using Drizzle.
4.  **UI Redesign**: Added custom css mesh variables, forced dark mode, split-pill navbar, upgraded landing details, and FAQ accordion views.
