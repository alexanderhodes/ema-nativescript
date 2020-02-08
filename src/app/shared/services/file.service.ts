import {Injectable} from "@angular/core";
import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";
import {Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FileService {

    constructor() {

    }

    createFile(fileName: string, content: string): boolean {
        let documents = knownFolders.documents();

        const file = documents.getFile(fileName);
        file.writeText(content).then(res => console.log('file', res), error => {
            return false;
        });

        return true;
    }

    readFile(fileName: string): Observable<string> {
        const subject$ = new ReplaySubject<string>();
        let documents = knownFolders.documents();
        let exists = documents.getFile(fileName);
        if (exists) {
            const file = documents.getFile(fileName);
            file.readText().then((res) => {
                console.log('read', res);
                subject$.next(res);
                subject$.complete();
            }, () => {
                subject$.next('');
                subject$.complete();
            });
        } else {
            subject$.next('');
            subject$.complete();
        }
        return subject$.asObservable();
    }

}
