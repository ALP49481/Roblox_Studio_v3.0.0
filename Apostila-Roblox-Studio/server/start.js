"use strict";

const { migrate } = require("./migrate");
const { pool } = require("./db");

const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 2_000;

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function prepareDatabase() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      await migrate();
      return;
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw error;
      const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
      console.warn(`Banco indisponível na tentativa ${attempt}; nova tentativa em ${delay / 1_000}s.`);
      await wait(delay);
    }
  }
}

prepareDatabase()
  .then(() => {
    require("./index");
  })
  .catch(async (error) => {
    console.error("A aplicação não iniciou porque o banco não pôde ser preparado.", error.message);
    await pool.end().catch(() => {});
    process.exit(1);
  });
