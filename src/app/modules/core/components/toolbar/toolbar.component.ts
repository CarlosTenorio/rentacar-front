import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    userLogged$: Observable<boolean>;

    constructor(private authService: AuthenticationService) {}

    ngOnInit() {
        this.userLogged$ = this.authService.userLogged$;
    }

    logout() {
        this.authService.logout();
    }
}
