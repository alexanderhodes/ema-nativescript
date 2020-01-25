import {Injectable} from "@angular/core";
import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

@Injectable({
    providedIn: "root"
})
export class FileService {

    constructor() {

    }

    createFile(fileName: string, content: string): boolean {
        let documents = knownFolders.documents();

        const file = documents.getFile(fileName);
        file.writeText(content).then(res => console.log('file', res));

        return true;
    }

    readFile(fileName: string): void {
        let documents = knownFolders.documents();
        let exists = documents.getFile(fileName);
        if (exists) {
            const file = documents.getFile(fileName);
            file.readText().then(res =>
                console.log('read', res)
            );
        }
    }

}
