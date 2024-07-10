import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { PostComponent } from './pages/post/post.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthModule } from './pages/auth/auth.module';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'posts', component: PostComponent, canActivate: [AuthGuard] },
];
