"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { hashPassword, normalizeUsername, passwordIsValid, safeEqual, usernameIsValid } = require("../server/security");

test("normaliza e valida nomes de usuário", () => {
  assert.equal(normalizeUsername("  Aluno.Teste  "), "aluno.teste");
  assert.equal(usernameIsValid("aluno_teste-1"), true);
  assert.equal(usernameIsValid("ab"), false);
  assert.equal(usernameIsValid("nome com espaço"), false);
});

test("aplica os limites de senha", () => {
  assert.equal(passwordIsValid("curta"), false);
  assert.equal(passwordIsValid("uma-senha-segura"), true);
  assert.equal(passwordIsValid("x".repeat(129)), false);
});

test("scrypt usa salt e permite comparação constante", async () => {
  const first = await hashPassword("senha-de-teste");
  const same = await hashPassword("senha-de-teste", first.salt);
  const other = await hashPassword("senha-diferente", first.salt);
  assert.equal(safeEqual(first.hash, same.hash), true);
  assert.equal(safeEqual(first.hash, other.hash), false);
  assert.equal(first.hash.toString("hex").includes("senha-de-teste"), false);
});
