import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class LoginService {

    constructor(
        private router: Router,
    ){}

    login() {
        localStorage.setItem('token-login', 'token')
    }

    logout() {
        localStorage.removeItem('token-login')
    }

    verifyAuth() {
        const user = localStorage.getItem('token-login');
        
        if (user) {
            return of(true)
        } else {
            return of(false)
        }
    }

    verifyLogin() {
        const user = localStorage.getItem('token')

        if (!user) {
            this.router.navigateByUrl('/login')
        } else {
            // this.currentUserRole = localStorage.getItem('userRole')
            this.router.navigateByUrl('/')
        }
    }
}