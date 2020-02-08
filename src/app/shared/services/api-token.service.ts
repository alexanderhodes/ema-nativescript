import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class ApiTokenService {

    private _what3words = "";
    private _pushy = "";
    private _mapbox = "";

    constructor() {

    }

    get what3words(): string {
        return this._what3words;
    }

    get pushy(): string {
        return this._pushy;
    }

    get mapbox(): string {
        return this._mapbox;
    }
}
