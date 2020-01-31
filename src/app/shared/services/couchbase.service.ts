import {Injectable} from "@angular/core";
import * as Couchbase from "nativescript-couchbase";

@Injectable({
    providedIn: "root"
})
export class CouchbaseService {

    private databaseName: string;
    private database: Couchbase.Couchbase;

    constructor() {
        this.databaseName = 'couchdb';
        this.database = new Couchbase.Couchbase(this.databaseName);
        this.database.createView('images', '1', (document, emitter) => {
            emitter.emit(document);
        });
    }

    public create(data: any): string {
        return this.database.createDocument(data);
    }

    public get(documentId: string): string {
        return this.database.getDocument(documentId);
    }

    public delete(documentId: string): string {
        return this.database.deleteDocument(documentId);
    }

    public update(documentId: string, data: any): string {
        return this.database.updateDocument(documentId, data);
    }

    public queryAll(): any {
        return this.database.executeQuery('images');
    }

}
