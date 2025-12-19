import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  registereForm: any;
  activeForm: 'login' | 'register' = 'login';
  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registereForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }
  login() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackbar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
    }
  }

  register() {
    if (this.registereForm.valid) {
      console.log('Registration Data:', this.registereForm.value);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.router.navigate(['/budget-planner/login']);
    } else {
      this.snackbar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
    }
  } 
}
