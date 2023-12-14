import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { AuthInterceptor } from './auth/auth.interceptor';
import { BlogService } from './services/blog.service';
import { AuthService } from './auth/auth.service';
import { AlertifyService } from './services/alertify.service';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginComponent } from './auth/user-login.component';
import { UserSignupComponent } from './auth/user-signup/user-signup.component';
import { NavBarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    CreateBlogComponent,
    UserLoginComponent,
    UserSignupComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BlogService,
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
