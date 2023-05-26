import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string | null = null;
    email!: string; 
    password!: string

    constructor(private authService: AuthService, private routrer: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);       
        } else {
            authObs = this.authService.signup(email, password);
         }

         authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            this.routrer.navigate(['/recipes']);
        },
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        }
     );  
        form.reset();
    }
}
