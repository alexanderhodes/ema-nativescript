import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {ApiTokenService} from "~/app/shared/services/api-token.service";

@Injectable({
    providedIn: "root"
})
export class PushyService {

    constructor(private httpClient: HttpClient, private apiTokenService: ApiTokenService) {
    }

    sendNotification(device: string, message: string): Observable<boolean> {
        const subject$ = new ReplaySubject<boolean>();

        const body = {
            "to": device,
            "data": {
                "message": message
            },
            "notification": {
                "body": message,
                "badge": 1,
                "sound": "ping.aiff"
            }
        };
        const apiKey = this.apiTokenService.pushy;

        this.httpClient.post(`https://api.pushy.me/push?api_key=${apiKey}`, body).subscribe(response => {
            console.log('pushy message response to', device, 'with message', message);
            console.log('response', response);
            console.log('--------------------------------------------------------------');
            subject$.next(true);
            subject$.complete();
        }, error => {
            subject$.error(error);
            subject$.complete();
        });

        return subject$.asObservable();
    }


}
