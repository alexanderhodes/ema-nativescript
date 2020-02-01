import { Injectable} from "@angular/core";
import {DatabaseService} from "~/app/shared/services/database.service";
import {Picture} from "~/app/shared/models/picture.models";


@Injectable({ providedIn: "root" })
export class PictureService {

    constructor(private databaseService: DatabaseService) {

    }

    createPicture(picture: Picture): void {
        // Observable zurückgeben, welches von dieser Methode zurückgegeben wird
        this.databaseService.insert(picture);
    }

}
