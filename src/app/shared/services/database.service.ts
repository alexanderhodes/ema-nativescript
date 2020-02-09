import {Injectable} from "@angular/core";
import {Picture} from "~/app/shared/models/picture.models";
import {Observable, ReplaySubject} from "rxjs";
var Sqlite = require("nativescript-sqlite");

@Injectable({ providedIn: "root"})
export class DatabaseService {

    private database;
    private createTable = "CREATE TABLE IF NOT EXISTS picture (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, name TEXT, liked INTEGER)";

    constructor() {
    }

    public insert(picture: Picture): Observable<Picture> {
        const subject$ = new ReplaySubject<Picture>();

        this.openDatabase().subscribe(database => {
            database.execSQL("INSERT INTO picture (url, name, liked) VALUES (?, ?, ?)",
                [picture.url, picture.name, picture.liked ? 1 : 0]).then(id => {
                console.log('insert result', id);
                picture.id = id;

                subject$.next(picture);
                subject$.complete();
            }, error => this.handleError(subject$, error, 'insert error'));
        }, error => this.handleError(subject$, error, 'insert database error'));

        return subject$.asObservable();
    }

    public delete(picture: Picture): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();

        this.openDatabase().subscribe(database => {
            database.execSQL("DELETE FROM picture WHERE id = ?", [picture.id]).then(id => {
                console.log('delete result', id);
                subject$.next(true);
                subject$.complete();
            }, error => this.handleError(subject$, error, 'delete error'));
        }, error => this.handleError(subject$, error, 'delete database error'));

        return subject$.asObservable();
    }

    public update(picture: Picture): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();
        const num = picture.liked ? 1 : 0;

        this.openDatabase().subscribe(database => {
            database.execSQL("UPDATE picture SET url = ?, name = ?, liked = ? WHERE id = ?",
                [picture.url, picture.name, num, picture.id]).then(res => {
                console.log('update result', res);
                subject$.next(true);
                subject$.complete();
            }, error => this.handleError(subject$, error, 'update error'));
        }, error => this.handleError(subject$, error, 'update database error'));

        return subject$.asObservable();
    }

    public findOne(id: string): Observable<Picture> {
        const subject$ = new ReplaySubject<Picture>();

        this.openDatabase().subscribe(database => {
            database.get("SELECT id, url, name, liked FROM picture WHERE id = ?", [id]).then(row => {
                console.log('result', row);
                if (row) {
                    const picture = this.createPicture(row);
                    subject$.next(picture);
                } else {
                    subject$.next(null);
                }
                subject$.complete();
            }, error => this.handleError(subject$, error, 'findOne error'));
        }, error => this.handleError(subject$, error, 'findOne database error'));

        return subject$.asObservable();
    }

    public findAll(): Observable<Picture[]> {
        const subject$ = new ReplaySubject<Picture[]>();
        const pictures = [];

        this.openDatabase().subscribe(database => {
            database.all("SELECT id, url, name, liked FROM picture").then(rows => {
                for (let row in rows) {
                    const picture = this.createPicture(rows[row]);
                    pictures.push(picture);
                }
                subject$.next(pictures);
                subject$.complete();
            }, error => this.handleError(subject$, error, 'findAll error'));
        }, error => this.handleError(subject$, error, 'finalAll database error'));

        return subject$.asObservable();
    }

    public deleteAll(): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();

        this.openDatabase().subscribe(database => {
            database.execSQL("DELETE FROM picture",).then(res => {
                console.log('delete all result', res);
                subject$.next(true);
                subject$.complete();
            }, error => this.handleError(subject$, error, 'deleteAll error'));
        }, error => this.handleError(subject$, error, 'deleteAll database error'));

        return subject$;
    }

    private createPicture (row): Picture {
        return {
            id: row[0],
            url: row[1],
            name: row[2],
            liked: row[3] === 1
        };
    }

    private openDatabase(): Observable<any> {
        const database$ = new ReplaySubject();

        if (!this.database) {
            (new Sqlite("sqlite.db")).then(db => {
                db.execSQL(this.createTable).then(response => {
                    console.log('create table', response);
                    this.database = db;
                    database$.next(db);
                },error => this.handleError(database$, error, 'error while create table'));
            }, error => this.handleError(database$, error, 'open db error'));
        } else {
            database$.next(this.database);
        }

        return database$.asObservable();
    }

    private handleError(subject$: ReplaySubject<any>, error: any, text?: string) {
        console.log('-------------');
        console.log('error', text);
        console.log(error);
        subject$.error(error);
        subject$.complete();
    }

}
