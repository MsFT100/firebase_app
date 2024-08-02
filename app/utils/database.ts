// src/utils/database.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, member_id INTEGER, location TEXT, FOREIGN KEY (member_id) REFERENCES members (id));'
    );
  });
};

export const addMember = (name: string, callback: Function) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO members (name) VALUES (?);',
      [name],
      (_, result) => {
        callback(result);
      },
      (_, error) => {
        console.error(error);
        return false;
      }
    );
  });
};

export const getMembers = (callback: Function) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM members;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (_, error) => {
        console.error(error);
        return false;
      }
    );
  });
};

export const assignTask = (memberId: number, location: string, callback: Function) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (member_id, location) VALUES (?, ?);',
      [memberId, location],
      (_, result) => {
        callback(result);
      },
      (_, error) => {
        console.error(error);
        return false;
      }
    );
  });
};

export const getTasks = (callback: Function) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT tasks.id, tasks.location, members.name FROM tasks INNER JOIN members ON tasks.member_id = members.id;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (_, error) => {
        console.error(error);
        return false;
      }
    );
  });
};
