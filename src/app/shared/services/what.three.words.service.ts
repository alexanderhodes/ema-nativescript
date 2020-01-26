import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WhatsThreeWords} from "~/app/shared/models/what.three.words.model";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class WhatThreeWordsService {

    private API_KEY = "";

    constructor(private httpClient: HttpClient) {

    }

    get(longitude: number, latitude: number): Observable<WhatsThreeWords> {
        const subject$ = new ReplaySubject<WhatsThreeWords>();

        const url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${longitude}%2C${latitude}&key=${this.API_KEY}&language=de`;

        this.httpClient.get(url).pipe().subscribe((response: WhatsThreeWords) => {
            subject$.next(response);
            subject$.complete();
        }, error => subject$.error(error));

        return subject$.asObservable();
    }

}
