"use strict";

const { Pool } = require("pg");

function databaseSsl() {
  const caValue = process.env.AIVEN_CA_CERT;
  if (caValue) {
    return {
      ca: caValue.replace(/\\n/g, "\n"),
      rejectUnauthorized: true
    };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AIVEN_CA_CERT é obrigatória em produção para verificar a conexão TLS.");
  }

  return false;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não foi definida.");
}

function databaseConnectionString() {
  let connectionUrl;

  try {
    connectionUrl = new URL(process.env.DATABASE_URL);
  } catch (_error) {
    throw new Error("DATABASE_URL não é uma URI PostgreSQL válida.");
  }

  if (!["postgres:", "postgresql:"].includes(connectionUrl.protocol)) {
    throw new Error("DATABASE_URL deve usar o protocolo postgres:// ou postgresql://.");
  }

  // node-postgres substitui o objeto ssl quando estes parâmetros aparecem na URI.
  // A aplicação fornece a CA explicitamente, então a URI deve carregar apenas a conexão.
  for (const parameter of ["sslmode", "sslcert", "sslkey", "sslrootcert", "uselibpqcompat"]) {
    connectionUrl.searchParams.delete(parameter);
  }

  return connectionUrl.toString();
}

function poolSize() {
  const configured = Number.parseInt(process.env.DATABASE_POOL_MAX || "3", 10);
  if (!Number.isInteger(configured)) return 3;
  return Math.min(Math.max(configured, 1), 5);
}

const pool = new Pool({
  connectionString: databaseConnectionString(),
  ssl: databaseSsl(),
  max: poolSize(),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
  statement_timeout: 10_000
});

pool.on("error", (error) => {
  console.error("Conexão ociosa com o banco falhou.", error.message);
});

module.exports = { pool };
