import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCard,
    MatError,
    MatSpinner,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButton,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) return;
    this.authService.signUp(form.value).subscribe({
      next: () => {},
      error: (error) => {
        console.log('Error', error);
      },
    });
  }
}
