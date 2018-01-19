/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import { SQLite } from 'expo'

const db = SQLite.openDatabase('vpa.db')

export function initDB() {
  console.log('init DB')
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS suppliers(
          id          INTEGER PRIMARY KEY,
          name        TEXT NOT NULL,
          email       TEXT NOT NULL,
          beginning   TEXT NOT NULL DEFAULT 'Bonjour,',
          end         TEXT NOT NULL DEFAULT 'Cordialement,'
        );`,
        [],
        () => resolve(),
        (tx, error) => reject(error)
      )
    })
  })
  .then(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products(
          id          INTEGER PRIMARY KEY,
          name        TEXT NOT NULL,
          category    TEXT NOT NULL,
          reference   TEXT,
          supplier    INTEGER NOT NULL,
          FOREIGN KEY(supplier) REFERENCES supplier(id)
        );`,
        [],
        () => Promise.resolve(),
        (_, error) => Promise.reject(error)
      )
    })
  })
}

export function getTable(table) {
  console.log('getTable')
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${table};`,
        [],
        (_, { rows: { _array }}) => resolve({ items: _array }),
        (_, error) => reject(error)
      )
    })
  })
}

export function addSupplier({name, email, beginning, end}) {
  console.log('addSupplier')
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO suppliers (name, email) VALUES (?, ?);`,
        [name, email],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}
