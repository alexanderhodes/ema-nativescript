import {Injectable} from "@angular/core";
import {Picture} from "~/app/shared/models/picture.models";
import {Observable, ReplaySubject} from "rxjs";
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

    public insert(picture: Picture): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();

        this.database.execSQL("INSERT INTO picture (url, name, liked) VALUES (?, ?, ?)",
            [picture.url, picture.name, picture.liked ? 1 : 0]).then(id => {
            console.log('insert result', id);
            subject$.next(true);
            subject$.complete();
        }, error => {
            console.log('insert error', error);
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
    }

    public delete(picture: Picture): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();

        this.database.execSQL("DELETE FROM picture WHERE id = ?", [picture.id]).then(id => {
            console.log('delete result', id);
            subject$.next(true);
            subject$.complete();
        }, error => {
            console.log('delete error', error);
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
    }

    public update(picture: Picture): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();
        const num = picture.liked ? 1 : 0;
        this.database.execSQL("UPDATE picture SET url = ?, name = ?, liked = ? WHERE id = ?",
            [picture.url, picture.name, num, picture.liked]).then(res => {
            console.log('update result', res);
            subject$.next(true);
            subject$.complete();
        }, error => {
            console.log('update error', error);
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
    }

    public findOne(id: string): Observable<Picture> {
        const subject$ = new ReplaySubject<Picture>();

        this.database.execSQL("SELECT * FROM picture WHERE id = ?", [id]).then(row => {
            console.log('result', row);
            if (row) {
                const picture = this.createPicture(row);
                subject$.next(picture);
            } else {
                subject$.next(null);
            }
            subject$.complete();
        }, error => {
            console.log('find error', error);
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
    }

    public findAll(): Observable<Picture[]> {
        const subject$ = new ReplaySubject<Picture[]>();

        const pictures = [];
        this.database.all("SELECT * FROM picture").then(rows => {
            for (let row in rows) {
                console.log('id', rows[row][1], 'liked', rows[row][3]);

                const picture = this.createPicture(rows[row]);
                pictures.push(picture);
            }
            subject$.next(pictures);
            subject$.complete();
        }, error => {
            console.log('select error', error);
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
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
