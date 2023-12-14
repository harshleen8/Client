import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UserLoginComponent } from './auth/user-login.component';
import { UserSignupComponent } from './auth/user-signup/user-signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'getAllBlogs', component: BlogListComponent , canActivate: [AuthGuard]},
  { path: 'create-blog', component: CreateBlogComponent, canActivate: [AuthGuard] },
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
