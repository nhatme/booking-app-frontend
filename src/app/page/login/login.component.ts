import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserValid } from '../home/api.model';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private cookieService: CookieService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http.get<UserValid[]>('http://localhost:3000/user').subscribe(users => {
        const user = users.find(u => u.username === email && u.password === password);
        if (user) {
          alert('Login successful');
          // Set cookies to expire in 5 minutes
          const now = new Date();
          const expirationTime = new Date(now.getTime() + 5 * 60 * 1000);

          this.cookieService.set('user_id_vnb', user.id, expirationTime);
          this.cookieService.set('username_vnb', email, expirationTime);

          this.router.navigate(['']);
        } else {
          alert('email or password is incorrect');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
