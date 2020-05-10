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
  try {
    const results = await connection.query(query);
    await connection.end();
    return results;
  } catch (error) {
    return { error };
  }
};
