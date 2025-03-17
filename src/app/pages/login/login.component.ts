import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password : ['',[Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      const success = this.authService.login(this.loginForm.value);
      console.log(success)
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    }
  }

}
