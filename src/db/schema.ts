import { pgTable, serial, integer, varchar, timestamp, date, pgEnum, decimal, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 0. Role Enum definition
export const roleEnum = pgEnum("role", ["admin", "voter"]);

// 1. Districts Table
export const districts = pgTable("districts", {
  districtId: serial("district_id").primaryKey(),
  districtName: varchar("district_name", { length: 255 }).notNull(),
});

// 2. Wards Table
export const wards = pgTable("wards", {
  wardNumber: integer("ward_number").primaryKey(),
  wardName: varchar("ward_name", { length: 255 }).notNull(),
  districtId: integer("district_id").references(() => districts.districtId),
});

// 3. Voters Table
export const voters = pgTable("voters", {
  voterId: serial("voter_id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("voter"),
  wardNumber: integer("ward_number").references(() => wards.wardNumber),
  districtId: integer("district_id").references(() => districts.districtId).notNull().default(3),
});

// 4. Parties Table
export const parties = pgTable("parties", {
  partyId: serial("party_id").primaryKey(),
  partyName: varchar("party_name", { length: 255 }).notNull(),
  partyLeader: varchar("party_leader", { length: 255 }).notNull(),
});

// 5. Elections Table
export const elections = pgTable("elections", {
  electionId: serial("election_id").primaryKey(),
  electionName: varchar("election_name", { length: 255 }).notNull(),
  startDate: timestamp("start_date").defaultNow(),
  endDate: date("end_date").notNull(),
  wardNumber: integer("ward_number"),
  districtId: integer("district_id").references(() => districts.districtId),
  currentStatus: boolean("current_status").notNull().default(true),
});

// 6. Candidates Table
export const candidates = pgTable("candidates", {
  candidateId: serial("candidate_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  partyId: integer("party_id").references(() => parties.partyId),
  electionId: integer("election_id").references(() => elections.electionId),
  email: varchar("email", { length: 50 }).notNull(),
});

// 7. Votes Table (with Hash Auditing support)
export const votes = pgTable("votes", {
  voteId: serial("vote_id").primaryKey(),
  voterId: integer("voter_id").references(() => voters.voterId),
  candidateId: integer("candidate_id").references(() => candidates.candidateId),
  timestamp: timestamp("timestamp").defaultNow(),
  // For Web3 hybrid auditing
  hash: varchar("hash", { length: 64 }),
  previousHash: varchar("previous_hash", { length: 64 }),
});

// 8. Election Results Table
export const electionResults = pgTable("election_results", {
  resultId: serial("result_id").primaryKey(),
  electionId: integer("election_id").references(() => elections.electionId),
  candidateId: integer("candidate_id").references(() => candidates.candidateId),
  totalVotes: integer("total_votes").notNull(),
  percentageVotes: decimal("percentage_votes", { precision: 5, scale: 2 }),
});

// --- Relations Setup ---

export const districtsRelations = relations(districts, ({ many }) => ({
  wards: many(wards),
  voters: many(voters),
  elections: many(elections),
}));

export const wardsRelations = relations(wards, ({ one, many }) => ({
  district: one(districts, {
    fields: [wards.districtId],
    references: [districts.districtId],
  }),
  voters: many(voters),
}));

export const votersRelations = relations(voters, ({ one, many }) => ({
  ward: one(wards, {
    fields: [voters.wardNumber],
    references: [wards.wardNumber],
  }),
  district: one(districts, {
    fields: [voters.districtId],
    references: [districts.districtId],
  }),
  votes: many(votes),
}));

export const electionsRelations = relations(elections, ({ one, many }) => ({
  district: one(districts, {
    fields: [elections.districtId],
    references: [districts.districtId],
  }),
  candidates: many(candidates),
  results: many(electionResults),
}));

export const candidatesRelations = relations(candidates, ({ one, many }) => ({
  party: one(parties, {
    fields: [candidates.partyId],
    references: [parties.partyId],
  }),
  election: one(elections, {
    fields: [candidates.electionId],
    references: [elections.electionId],
  }),
  votes: many(votes),
  results: many(electionResults),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  voter: one(voters, {
    fields: [votes.voterId],
    references: [voters.voterId],
  }),
  candidate: one(candidates, {
    fields: [votes.candidateId],
    references: [candidates.candidateId],
  }),
}));
