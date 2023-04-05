import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  onDestroy = new Subject<void>();

  public loginForm = this.fb.group({
    email: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required)
  });

  public isLoading = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.checkAuth();
  }

  performRequest() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      let loginObject: any = {
        password: this.loginForm.get('password').value,
        email: this.loginForm.get('email').value 
      };
  
      this.apiService.loginUser(loginObject)
        .then((data) => {
          if (data['empleado']) {
            this.apiService.saveUser(data);
            this.isLoading = false;
          } else {
            this.isLoading = false;
            console.log(data)
            alert("Usuario y/o contraseña incorrecta")
          }
        })
        .catch((error) => {
          this.isLoading = false;
          alert("Usuario y/o contraseña incorrecta")
        });
    }
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
