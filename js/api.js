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
          email       TEXT,
          phone       TEXT,
          subject     TEXT,
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
          FOREIGN KEY(supplier) REFERENCES suppliers(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
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

export function addSupplier(data) {
  console.log('addSupplier')
  const { name, email, phone, subject, beginning, end } = data
  const defaultBeginning = 'Bonjour,'
  const defaultEnd = 'Cordialement,'
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO suppliers
          VALUES (NULL, ?, ?, ?, ?, ?, ?);`, [
          name,
          email || '',
          phone || '',
          subject || '',
          beginning || defaultBeginning,
          end || defaultEnd
        ],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function editSupplier(id, data) {
  console.log('editSupplier')
  const { name, email, phone, subject, beginning, end } = data

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE suppliers
          SET name = ?,
              email = ?,
              phone = ?,
              subject = ?,
              beginning = ?,
              end = ?
          WHERE id = ?`,
        [name, email, phone, subject, beginning, end, id],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function deleteRowById(table, id) {
  console.log('delete row by id')

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${table} WHERE id = ${id};`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function addProduct(suppliderId, data) {
  console.log('add product')
  const { name, category, reference } = data

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO products (name, category, reference, supplier)
          VALUES (?, ?, ?, ?);`,
        [name, category, reference || null, suppliderId],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function editProduct(id, data) {
  console.log('editProduct')
  const { name, category, reference } = data

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE products
          SET name = ?,
              category = ?,
              reference = ?
          WHERE id = ?`,
        [name, category, reference, id],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function getProductsOfSupplierSorted(supplierId, columnToSort) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM products
          WHERE supplier = ${supplierId}
          ORDER BY ${columnToSort};`,
        [],
        (_, { rows: { _array }}) => resolve({ items: _array }),
        (_, error) => reject(error)
      )
    })
  })
}

export function getCategoriesOfProductsBySupplier(supplierId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT DISTINCT category FROM products
          WHERE supplier = ${supplierId}
          ORDER BY category;`,
        [],
        (_, { rows: { _array }}) => resolve({ items: _array }),
        (_, error) => reject(error)
      )
    })
  })
}

export function dropTable(table) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE ${table}`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function addColumnToTable(table, column) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `ALTER TABLE ${table}
          ADD COLUMN subject text;`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}