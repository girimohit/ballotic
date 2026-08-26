# Ballotic 🗳️

Ballotic is a digital voting utility that bridges the absolute mathematical integrity of blockchain vote-chaining with a low-latency web interface. It implements a zero-trust, hybrid vote-securing registry where database ballots are cryptographically linked together and anchored to public blockchain networks, establishing a secure audit trail that makes unauthorized database manipulation impossible to hide.

---

## Key Features

### 🔒 Cryptographic Vote Chaining (SHA-256)
Every vote cast on Ballotic is linked to the previous vote's cryptographic hash, forming an append-only ledger directly in the database. If a single record or bit is altered inside the database, the hash chain is instantly broken, exposing tampering during audits.

### 🌐 Hybrid Web3 Anchoring
Voters receive a validation receipt once they cast a ballot. The root hash of the vote ledger is periodically anchored on-chain to public Layer 2 networks (simulated on Arbitrum One), creating permanent validation records that prove the continuity of the database.

### 👥 Guest ballot Browsing & Role Protection
*   **Anonymous Browsing**: Anyone can visit the elections portal to browse active and concluded elections.
*   **Login to Vote**: Guests are blocked from submitting ballots and redirected to log in first.
*   **Double-Voting Protection**: The database checks that a voter has not previously cast a ballot in the selected election before accepting new insertions.
*   **Admin Mode Lock**: Admin routing is protected via custom NextAuth middleware role-checks. Non-administrators are blocked from access and redirected to the home route.

### 🗺️ Dynamic District & Ward Registration
Voter registration profiles are bound to specific districts and wards. Selecting a district dynamically filters available wards to prevent database key constraint errors. Active elections are filtered based on the voter's registered district.

### 📊 Premium Glassmorphic Admin Dashboard
Administrators can securely manage voters (automatically hashed with bcrypt), register candidates, and configure ward-scoped elections using dynamic data tables.

---

## Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Database**: Neon Serverless PostgreSQL
*   **ORM**: Drizzle ORM
*   **Authentication**: NextAuth.js (JWT strategy, custom Credentials validation)
*   **Password Security**: Bcryptjs (10 salt rounds)
*   **Icons**: Lucide React
*   **Animations**: Framer Motion

---

## Getting Started

### 1. Environment Variables
Create a `.env.local` file in the root folder and configure the database and auth secret parameters:

```env
# Database connection URL (Postgres)
DATABASE_URL="postgres://..."

# NextAuth secret configuration
NEXTAUTH_SECRET="some-super-secure-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Install Dependencies
Install all required modules locally:

```bash
npm install
```

### 3. Database Schema Migration
Push the Drizzle schema configurations directly to your Neon Postgres database instance:

```bash
npx drizzle-kit push:pg
```

### 4. Seed Database
Seed the database tables with default districts, wards, mock candidates, political parties, active elections, and default credentials:

```bash
npx tsx scripts/seed.ts
```

This creates the default user profiles:
*   **Admin Profile**: Username `mohit` | Password `baL@otic`
*   **Voter Profile**: Username `aravind` | Password `baL@otic`

### 5. Running the Development Server
Launch the Next.js local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to browse active ballots, verify vote chains, or login.

---

## Cryptographic Chaining Model

The database ledger utilizes a Merkle-link structure:

```
[Genesis Block: Hash = "000000..."]
       ▲
       │ (Previous Hash Reference)
[Vote #1: SHA-256(VoterID + CandidateID + Timestamp + GenesisHash)]
       ▲
       │ (Previous Hash Reference)
[Vote #2: SHA-256(VoterID + CandidateID + Timestamp + Vote#1_Hash)]
```

Auditors run a verify crawler that traverses the database chain from back to front, confirming that `previousHash` columns match their parent records. The final leaf hash is matched against the Web3 Arbitrum receipt to prove that no rows have been deleted, appended, or modified since the blockchain checkpoint.
