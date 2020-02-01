import {Injectable} from "@angular/core";
import {Picture} from "~/app/shared/models/picture.models";
var Sqlite = require("nativescript-sqlite");

@Injectable({ providedIn: "root"})
export class DatabaseService {

    private database: any;

    private createTable = "CREATE TABLE IF NOT EXISTS picture (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, name TEXT, liked INTEGER)";

    constructor() {
        this.database = (new Sqlite("sqlite.db")).then(db => {
            this.database = db;
            this.database.execSQL(this.createTable).then(response => console.log('create table', response),
                    error => console.log('error while create table', error));
        }, error => {
            console.log("open db error", error);
        });
    }

    public insert(picture: Picture): boolean {
        return this.database.execSQL("INSERT INTO picture (url, name, liked) VALUES (?, ?, ?)",
            [picture.url, picture.name, picture.liked ? 1 : 0]).then(id => {
            console.log('insert result', id);
            return true;
        }, error => {
            console.log('insert error', error);
            return false;
        });
    }

    public delete(picture: Picture): boolean {
        return this.database.execSQL("DELETE FROM picture WHERE id = ?", [picture.id]).then(id => {
            console.log('delete result', id);
            return true;
        }, error => {
            console.log('delete error', error);
            return false;
        });
    }

    public update(picture: Picture): boolean {
        const num = picture.liked ? 1 : 0;
        return this.database.execSQL("UPDATE picture SET url = ?, name = ?, liked = ? WHERE id = ?",
            [picture.url, picture.name, num, picture.liked]).then(res => {
            console.log('update result', res);
            return true;
        }, error => {
            console.log('update error', error);
            return false;
        })
    }

    public findOne(id: string): Picture {
        return this.database.execSQL("SELECT * FROM picture WHERE id = ?", [id]).then(row => {
            console.log('result', row);
            if (row) {
                return this.createPicture(row);
            }
            return null;
        }, error => {
            console.log('find error', error);
            return null;
        })
    }

    public findAll(): Picture[] {
        const pictures = [];
        this.database.all("SELECT * FROM picture").then(rows => {
            for (let row in rows) {
                console.log('id', rows[row][1], 'liked', rows[row][3]);

                const picture = this.createPicture(rows[row]);
                pictures.push(picture);
            }
        }, error => console.log('select error', error));
        return pictures;
    }

    private createPicture (row): Picture {
        return {
            id: row[1],
            url: row[2],
            name: row[3],
            liked: row[4] === 1 ? true : false
        };
    }

}
