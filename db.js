const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "containers-us-west-38.railway.app",
  database: "railway",
  password: "k8n8cArs4RVgdHJrMmww",
  port: 6790,
});

module.exports = pool;
