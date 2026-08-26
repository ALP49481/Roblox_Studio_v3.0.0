"use strict";

const crypto = require("node:crypto");
const { promisify } = require("node:util");

const scrypt = promisify(crypto.scrypt);

function normalizeUsername(value) {
  return typeof value === "string" ? value.trim().toLocaleLowerCase("pt-BR") : "";
}

function usernameIsValid(username) {
  return /^[a-z0-9._-]{3,32}$/.test(username);
}

function passwordIsValid(password) {
  return typeof password === "string" && password.length >= 10 && password.length <= 128;
}

async function hashPassword(password, salt = crypto.randomBytes(16)) {
  const derived = await scrypt(password, salt, 64, { N: 16_384, r: 8, p: 1 });
  return { salt, hash: Buffer.from(derived) };
}

function safeEqual(left, right) {
  return Buffer.isBuffer(left) && Buffer.isBuffer(right) && left.length === right.length && crypto.timingSafeEqual(left, right);
}

module.exports = { hashPassword, normalizeUsername, passwordIsValid, safeEqual, usernameIsValid };
