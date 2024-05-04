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
