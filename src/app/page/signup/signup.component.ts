import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private readonly router: Router, private readonly cookieService: CookieService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, phoneNumber, password } = this.signupForm.value;
      const newUser = {
        id: this.generateRandomId(),
        username: email,
        password: password,
        phonenumber: phoneNumber
      };

      this.http.post('http://localhost:3000/user', newUser).subscribe(
        response => {
          // console.log('Signup successful', response);
          alert("Sign up successful");
          this.cookieService.set('user_id_vnb', newUser.id, 5 / 1440);
          this.cookieService.set('username_vnb', newUser.username, 5 / 1440);

          this.router.navigate(['']);
        },
        error => {
          console.error('Signup failed', error);
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  private generateRandomId(length: number = 8): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomId += charset[randomIndex];
    }
    return randomId;
  }
}
