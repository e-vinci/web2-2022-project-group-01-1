/* eslint-disable no-console */
const db = require('better-sqlite3')('E:\\projetweb\\db\\database.db', { verbose: console.log });

module.exports = db;
