import mysql, { Connection } from "mysql2/promise";

interface QueryOptions {
  query: string;
  values?: any[];
}

export async function query({ query, values = [] }: QueryOptions): Promise<any> {
  const db: Connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nextjs",
  });

  try {
    const [results] = await db.execute(query, values);
    db.end();
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// import mysql from "mysql2/promise";

// export default async function handler(req: any, res: any) {
//   try {
//     // Create a MySQL connection
//     const db = await mysql.createConnection({
//       host: "localhost",
//       database: "nextjs",
//       user: "root",
//       password: "root",
//     });

//     // Execute the SQL query
//     const query = "SELECT * FROM voter";
//     const [resData] = await db.execute(query);

//     // Close the database connection
//     await db.end();

//     // Send the response with fetched data
//     res.status(200).json(resData);
//   } catch (error) {
//     console.error("Error fetching voters:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

//connect database inside a  function with (query, data) as props
//execute query => await db.execute(query, data)
// end the connect using await db.end();
// return the result of executed query
