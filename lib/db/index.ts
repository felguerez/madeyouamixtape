const mysql = require("serverless-mysql");

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export const query = async (query) => {
  try {
    console.log("query:", query);
    const results = await db.query(query);
    console.log("results:", results);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};
