"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { pool } = require("./db");

async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock($1::bigint)", [20260826]);
    await client.query(schema);
    await client.query("COMMIT");
    console.log("Estrutura do banco verificada.");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  migrate()
    .catch((error) => {
      console.error("Não foi possível preparar o banco.", error.message);
      process.exitCode = 1;
    })
    .finally(() => pool.end());
}

module.exports = { migrate };
