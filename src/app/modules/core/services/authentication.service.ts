import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const KEY_AUTH_TOKEN = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    readonly userLogged$: Observable<boolean> = this.userLoggedSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkIfUserIsLogged();
    }

    private checkIfUserIsLogged() {
        const token = localStorage.getItem(KEY_AUTH_TOKEN);
        if (token) {
            this.setUserLogged(true);
        }
    }

    login(username: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(environment.apiTokenURL, { username: username, password: password });
    }

    logout() {
        localStorage.removeItem(KEY_AUTH_TOKEN);
        this.setUserLogged(false);
    }

    registerUser() {}

    setUserLogged(isLogged: boolean) {
        this.userLoggedSubject.next(isLogged);
    }
}
