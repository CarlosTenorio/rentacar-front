import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { subscribeOn, tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    readonly userLogged$: Observable<boolean> = this.userLoggedSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(environment.apiTokenURL, { username: username, password: password });
    }

    setUserLogged(isLogged: boolean) {
        this.userLoggedSubject.next(isLogged);
    }
}
