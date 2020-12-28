import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
    email: string;
    error: string = null;
    loading = false;
    password: string;

    constructor(private authenticationService: AuthenticationService) {}

    cancel() {}

    login(loginForm: NgForm) {
        if (loginForm.valid && !this.loading) {
            this.loading = true;
            this.authenticationService
                .login(this.email, this.password)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe(
                    ({ token }) => {
                        console.log(token);
                        if (token) {
                            localStorage.setItem('authToken', token);
                            this.authenticationService.setUserLogged(true);
                        } else {
                            this.error = 'Username or password is incorrect';
                        }
                    },
                    () => {
                        console.log('error');
                        this.error = 'Username or password is incorrect';
                    }
                );
        }
    }
}
