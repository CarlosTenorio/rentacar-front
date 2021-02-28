import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/services/authentication/authentication.service';

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

    constructor(private authService: AuthenticationService, private dialogRef: MatDialogRef<DialogLoginComponent>) {}

    cancel() {
        this.dialogRef.close();
    }

    login(loginForm: NgForm) {
        if (loginForm.valid && !this.loading) {
            this.loading = true;
            this.authService
                .login(this.email, this.password)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe(
                    ({ token }) => {
                        if (token) {
                            localStorage.setItem('authToken', token);
                            this.authService.setUserLogged(true);
                            this.dialogRef.close();
                        }
                    },
                    () => {
                        this.error = 'Username or password is incorrect';
                    }
                );
        }
    }
}
