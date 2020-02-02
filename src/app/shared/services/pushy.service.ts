import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PushyService {

    private SECRET_API_KEY = '';

    constructor(private httpClient: HttpClient) {

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

        this.httpClient.post(`https://api.pushy.me/push?api_key=${this.SECRET_API_KEY}`, body).subscribe(response => {
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
