import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WhatsThreeWords} from "~/app/shared/models/what.three.words.model";
import {Observable, ReplaySubject} from "rxjs";
import {ApiTokenService} from "~/app/shared/services/api-token.service";

@Injectable({
    providedIn: "root"
})
export class WhatThreeWordsService {

    constructor(private httpClient: HttpClient,
                private apiTokenService: ApiTokenService) {

    }

    get(longitude: number, latitude: number): Observable<WhatsThreeWords> {
        const subject$ = new ReplaySubject<WhatsThreeWords>();

        const apiKey = this.apiTokenService.what3words;
        const url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${latitude}%2C${longitude}&key=${apiKey}&language=de`;

        this.httpClient.get(url).pipe().subscribe((response: WhatsThreeWords) => {
            subject$.next(response);
            subject$.complete();
        }, error => subject$.error(error));

        return subject$.asObservable();
    }

}
