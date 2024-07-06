import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {
    this.userLoggedIn = this.authService.getToken();
  }

  onLogOut() {
    this.authService.clearStorage();
    this.route.navigate(['/']);
  }
}
