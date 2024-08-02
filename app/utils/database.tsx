import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('app.db');


export type Member = {
  id: number;
  name: string;
};

export const createTables = async () => {
  console.log("Creating/opening");
  
  //await dropTables();
  
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER,
      location TEXT,
      latitude REAL,
      longitude REAL,
      description TEXT,
      FOREIGN KEY (member_id) REFERENCES members (id)
    );
  `);
};

export const addMember = async (name: string, callback: Function) => {
  try {
    const db = await dbPromise;
    const result = await db.runAsync('INSERT INTO members (name) VALUES (?);', [name]);
    callback(result);
  } catch (error) {
    console.error(error);
  }
};

export const getMembers = async (callback: Function) => {
  try {
    const db = await dbPromise;
    const rows = await db.getAllAsync('SELECT * FROM members;');
    callback(rows);
  } catch (error) {
    console.error(error);
  }
};

export const assignTask = async (memberId: number, latitude: number, longitude: number, description: string, location: string, callback: Function) => {
  try {
    const db = await dbPromise;
    const result = await db.runAsync('INSERT INTO tasks (member_id, latitude, longitude, location) VALUES (?, ?, ?, ?);', [memberId, latitude, longitude, location]);
    callback(result);
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (callback: Function) => {
  try {
    const db = await dbPromise;
    const rows = await db.getAllAsync('SELECT tasks.id, tasks.latitude, tasks.longitude, tasks.location, members.name FROM tasks INNER JOIN members ON tasks.member_id = members.id;');
    callback(rows);
  } catch (error) {
    console.error(error);
  }
};

// src/utils/database.ts
export const clearTasks = async (callback: Function) => {
  try {
    const db = await dbPromise;
    const result = (await db).runAsync(
      'DELETE FROM tasks;'
      );
    callback(result);
  } catch (error) {
    console.error(error);
  }
};

export const dropTables = async () => {
  console.log("Dropping tables");
  
  const db = await dbPromise;
  await db.execAsync(`
    DROP TABLE IF EXISTS tasks;
  `);
};
