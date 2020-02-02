import * as connectivityModule from "tns-core-modules/connectivity";
import {startMonitoring, stopMonitoring} from "tns-core-modules/connectivity";
import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ConnectivityService {

    private hasInternetConnection$: Subject<boolean>;
    private connectionType$: Subject<string>;
    private started: boolean;

    constructor() {
        this.started = false;
        this.hasInternetConnection$ = new ReplaySubject<boolean>();
        this.connectionType$ = new ReplaySubject<string>();
    }

    public start(): void {
        if (!this.started) {
            this.hasInternetConnection$ = new ReplaySubject<boolean>();
            this.connectionType$ = new ReplaySubject<string>();
            startMonitoring((type: number) => {
                const connectionType: string = this.checkConnectionType(type);
                this.connectionType$.next(connectionType);
                const hasInternetConnection: boolean = connectionType === 'Wi-Fi' || connectionType === 'Mobile';
                this.hasInternetConnection$.next(hasInternetConnection);
            });
            this.started = true;
        }
    }

    public stop(): void {
        if (this.started) {
            this.hasInternetConnection$.complete();
            this.connectionType$.complete();
            stopMonitoring();
            this.started = false;
        }
    }

    public hasInternetConnection(): Observable<boolean> {
        return this.hasInternetConnection$.asObservable();
    }

    public getConnectionType(): Observable<string> {
        return this.connectionType$.asObservable();
    }

    private checkConnectionType (type: number): string {
        let connectionType: string;

        switch (type) {
            case connectivityModule.connectionType.none:
                connectionType = "None";
                break;
            case connectivityModule.connectionType.wifi:
                connectionType = "Wi-Fi";
                break;
            case connectivityModule.connectionType.mobile:
                connectionType = "Mobile";
                break;
            case connectivityModule.connectionType.bluetooth:
                connectionType = "Bluetooth";
                break;
            default:
                break;
        }

        console.log('connection-type', type, connectionType);
        return connectionType;
    }

}
