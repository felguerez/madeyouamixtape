require("dotenv").config();
module.exports = {
  env: {
    mysql_host: process.env.MYSQL_HOST,
    mysql_user: process.env.MYSQL_USER,
    mysql_database: process.env.MYSQL_PASSWORD,
    mysql_password: process.env.MYSQL_PASSWORD,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    base_url: process.env.BASE_URL,
  },
  target: "serverless",
};
