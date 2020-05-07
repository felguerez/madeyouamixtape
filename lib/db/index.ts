const mysql = require("serverless-mysql");

export const connection = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export const query = async (query) => {
  console.log("connecting to ", process.env.MYSQL_HOST);
  console.log("database :", process.env.MYSQL_DATABASE);
  console.log("user", process.env.MYSQL_USER);
  console.log("pw", process.env.MYSQL_PASSWORD);
  try {
    console.log("query:", query);
    const results = await connection.query(query);
    console.log("results:", results);
    await connection.end();
    return results;
  } catch (error) {
    return { error };
  }
};
