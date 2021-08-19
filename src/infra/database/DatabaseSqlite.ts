import DatabaseSQL from "./DatabaseSQL";
import sqlite3 from "sqlite3";
import sqlite, { open } from "sqlite";

export default class DatabaseSqlite implements DatabaseSQL {
  connection: sqlite.Database | undefined;
  config: {
    driver: typeof sqlite3.Database;
    filename: string;
    mode?: number | undefined;
  };

  static instance: DatabaseSqlite;

  private constructor(filename: string) {
    this.config = {
      filename: filename,
      driver: sqlite3.Database,
    };
  }

  static getInstance() {
    if (!DatabaseSqlite.instance) {
      DatabaseSqlite.instance = new DatabaseSqlite("./database.sqlite");
    }
    return DatabaseSqlite.instance;
  }

  get db(): sqlite.Database {
    if (!this.connection) {
      throw new Error("sqlite database not connected");
    }
    return this.connection;
  }

  async connect() {
    this.connection = await open(this.config);
  }

  many(query: string, parameters: any[]) {
    return this.db.all(query, parameters);
  }

  one(query: string, parameters: any[]) {
    return this.db.get(query, parameters);
  }

  none(query: string, parameters: any): void {
    this.db.exec(query);
  }
}
