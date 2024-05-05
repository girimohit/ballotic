import mysql, { Connection } from "mysql2/promise";

interface QueryOptions {
  query: string;
  values?: any[];
}

export async function query({ query, values = [] }: QueryOptions): Promise<any> {
  const db: Connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost", // Use environment variable or default to localhost
    user: process.env.DB_USER || "root", // Use environment variable or default to root
    password: process.env.DB_PASSWORD || "root", // Use environment variable or default to root
    database: process.env.DB_DATABASE || "ballotic",
  });
  try {
    const [results] = await db.execute(query, values);
    db.end();
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 USING ODBC                                 */
/* -------------------------------------------------------------------------- */
// import odbc from "odbc";

// interface QueryOptions {
//   query: string;
//   values?: any[];
// }

// export async function query({ query, values = [] }: QueryOptions): Promise<any> {
//   const connectionString = "DSN=my-database;UID=root;PWD=root;SERVER=localhost;PORT=3306;DATABASE=ballotic";

//   try {
//     // Establish a connection to the database
//     const connection = await odbc.connect(connectionString);

//     // Execute the query
//     const result = await connection.query(query, values);

//     // Close the connection
//     await connection.close();

//     return result;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

/* -------------------------------------------------------------------------- */
/*          IF TABLES ARE NOT THERE, THEN IT WILL CREATE ALL OF TEHM          */
/* -------------------------------------------------------------------------- */
// import mysql, { Connection } from "mysql2/promise";

// interface QueryOptions {
//   query: string;
//   values?: any[];
// }

// export async function query({ query, values = [] }: QueryOptions): Promise<any> {
//   const db: Connection = await mysql.createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "root",
//     database: process.env.DB_DATABASE || "ballot_trial",
//   });
//   try {
//     // Define table creation queries if they don't exist
//     const tableQueries = [
//       `CREATE TABLE IF NOT EXISTS districts (
//         district_id INT NOT NULL AUTO_INCREMENT,
//         district_name VARCHAR(255) NOT NULL,
//         PRIMARY KEY (district_id)
//       )`,
//       `CREATE TABLE IF NOT EXISTS parties (
//         party_id INT NOT NULL AUTO_INCREMENT,
//         party_name VARCHAR(255) NOT NULL,
//         party_leader VARCHAR(255) NOT NULL,
//         PRIMARY KEY (party_id)
//       )`,
//       `CREATE TABLE IF NOT EXISTS wards (
//         ward_number INT NOT NULL,
//         ward_name VARCHAR(255) NOT NULL,
//         district_id INT NULL DEFAULT NULL,
//         PRIMARY KEY (ward_number),
//         INDEX district_id (district_id),
//         CONSTRAINT fk_district
//           FOREIGN KEY (district_id)
//           REFERENCES districts (district_id)
//       )`,
//       `CREATE TABLE IF NOT EXISTS elections (
//         election_id INT NOT NULL AUTO_INCREMENT,
//         election_name VARCHAR(255) NOT NULL,
//         start_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
//         end_date DATE NOT NULL,
//         ward_number INT NULL DEFAULT NULL,
//         district_id INT NULL DEFAULT NULL,
//         current_status TINYINT(1) NOT NULL DEFAULT '1',
//         PRIMARY KEY (election_id),
//         INDEX district_id (district_id),
//         CONSTRAINT elections_ibfk_1
//           FOREIGN KEY (district_id)
//           REFERENCES districts (district_id)
//       )`,
//       `CREATE TABLE IF NOT EXISTS voter (
//         voter_id INT NOT NULL AUTO_INCREMENT,
//         username VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         role ENUM('admin', 'voter') NOT NULL,
//         ward_number INT NOT NULL,
//         district_id INT NOT NULL,
//         dob DATE NOT NULL DEFAULT '2000-01-01',
//         PRIMARY KEY (voter_id),
//         UNIQUE INDEX username_UNIQUE (username),
//         UNIQUE INDEX email_UNIQUE (email),
//         INDEX fk_district (district_id),
//         INDEX voter_ibfk_1 (ward_number),
//         CONSTRAINT fk_district
//           FOREIGN KEY (district_id)
//           REFERENCES districts (district_id),
//         CONSTRAINT voter_ibfk_1
//           FOREIGN KEY (ward_number)
//           REFERENCES wards (ward_number)
//       )`,
//       `CREATE TABLE IF NOT EXISTS candidates (
//         candidate_id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(255) NOT NULL,
//         party_id INT NULL DEFAULT NULL,
//         election_id INT NULL DEFAULT NULL,
//         email VARCHAR(50) NOT NULL,
//         PRIMARY KEY (candidate_id),
//         INDEX party_id (party_id),
//         INDEX election_id (election_id),
//         CONSTRAINT candidates_ibfk_1
//           FOREIGN KEY (party_id)
//           REFERENCES parties (party_id),
//         CONSTRAINT candidates_ibfk_2
//           FOREIGN KEY (election_id)
//           REFERENCES elections (election_id)
//       )`,
//       `CREATE TABLE IF NOT EXISTS votes (
//         vote_id INT NOT NULL AUTO_INCREMENT,
//         voter_id INT NULL DEFAULT NULL,
//         candidate_id INT NULL DEFAULT NULL,
//         timestamp TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
//         election_id INT NOT NULL,
//         PRIMARY KEY (vote_id),
//         INDEX voter_id (voter_id),
//         INDEX candidate_id (candidate_id),
//         INDEX election_id (election_id),
//         CONSTRAINT votes_ibfk_1
//           FOREIGN KEY (voter_id)
//           REFERENCES voter (voter_id),
//         CONSTRAINT votes_ibfk_2
//           FOREIGN KEY (candidate_id)
//           REFERENCES candidates (candidate_id),
//         CONSTRAINT votes_ibfk_3
//           FOREIGN KEY (election_id)
//           REFERENCES elections (election_id)
//       )`,
//     ];

//     // Execute table creation queries
//     for (const tableQuery of tableQueries) {
//       await db.execute(tableQuery);
//     }

//     // Execute the provided query
//     const [results] = await db.execute(query, values);
//     db.end();
//     return results;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
