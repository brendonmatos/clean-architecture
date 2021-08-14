import DatabaseSQL from "./DatabaseSQL";
import sqlite3 from 'sqlite3'
import sqlite, {open} from 'sqlite' 

export default class DatabaseSqlite implements DatabaseSQL {
    connection: sqlite.Database | undefined
    config: { driver: typeof sqlite3.Database; filename: string; mode?: number | undefined; };
    
    constructor(filename: string) {
        this.config = {
            filename: filename,
            driver: sqlite3.Database
        }
    }

    get db() : sqlite.Database {
        if (!this.connection) {
            throw new Error('sqlite database not connected')
        }
        return this.connection
    }

    async connect() {
        this.connection = await open(this.config)
    }

    many(query: string, parameters: any[]) {
        return this.db.all(query, parameters)
    }

    one(query: string, parameters: any[]) {
        return this.db.get(query, parameters)
    }

}