import sqlite3 from "sqlite3"
import path from 'path'
import fs from 'fs'

sqlite3.verbose() // when debug

export const DB_PATH: string = path.resolve('../../db/tsugoukun.sqlite');

export default () => {
    const db = prepareDb()
    prepareTable(db)

}


const prepareTable = (db: sqlite3.Database) => {
    db.run("CREATE TABLE IF NOT EXISTS moyooshi (  \n" +
        "  id INTEGER PRIMARY KEY,\n" +
        "  name TEXT NOT NULL,\n" +
        "  memo TEXT NOT NULL,\n" +
        "  schedule_update_id TEXT NOT NULL\n" +
        ");")

    db.run("CREATE TABLE IF NOT EXISTS moyooshikouho_nichiji (  \n" +
        "  id INTEGER PRIMARY KEY,\n" +
        "  kouho_nichiji TEXT NOT NULL,\n" +
        "  moyooshi_id INTEGER NOT NULL,\n" +
        "  foreign key(moyooshi_id) references moyooshi(id)\n" +
        ");");

    db.run("CREATE TABLE IF NOT EXISTS sankasha (  \n" +
        "  id INTEGER PRIMARY KEY,\n" +
        "  name TEXT NOT NULL,\n" +
        "  moyooshi_id INTEGER NOT NULL,\n" +
        "  comment TEXT NOT NULL,\n" +
        "  foreign key(moyooshi_id) references moyooshi(id)\n" +
        ");");

    db.run("CREATE TABLE IF NOT EXISTS sanka_nichiji (  \n" +
        "  id INTEGER PRIMARY KEY,\n" +
        "  sanka_kahi INTEGER NOT NULL,\n" +
        "  moyooshi_kouho_nichiji_id INTEGER NOT NULL,\n" +
        "  sankasha_id INTEGER NOT NULL,\n" +
        "  foreign key(moyooshi_kouho_nichiji_id) references moyooshikouho_nichiji(id),\n" +
        "  foreign key(sankasha_id) references sankasha(id)\n" +
        ");");
}

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// DB準備関数
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
const prepareDb = (): sqlite3.Database => {
    let db = new sqlite3.Database(DB_PATH)

    db.serialize();
    db.on('error', function (err) {
        console.error(err);
        process.exit(1);
    });
    return db
}
