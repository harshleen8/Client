import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResult } from './login-result';
import { LoginRequest } from './login-request';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertifyService } from '../services/alertify.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginResult!: LoginResult;
  form!: FormGroup;
  showChangePassword: boolean = false;
  showResetPassword: boolean = false;
  showChangePasswordForm: boolean = false;
  showForgotPasswordLink: boolean = true;
  showChangePasswordLink: boolean = true;
  changePasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.resetPasswordForm = this.formBuilder.group({
        resetPasswordUserName: ['', Validators.required],
        newPassword: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      currentPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, Validators.required],
      resetPasswordUserName: [null, [Validators.required]]
    });
    this.changePasswordForm = this.formBuilder.group({
      userName: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

 // Add a method for resetting the password
resetPassword() {
  const resetPasswordRequest = {
    userName: this.form.controls['resetPasswordUserName'].value,
    newPassword: this.form.controls['newPassword'].value
  };

  this.authService.resetPassword(resetPasswordRequest).subscribe(
    () => {
      // Password reset successfully
      // You can add any additional logic here, such as displaying a success message
      alert('Password reset successfully.');

      // Reset the form
      this.form.reset();
    },
    (error: any) => {
      // Failed to reset the password
      // You can handle the error here, such as displaying an error message
      console.log(error);
      alert('Failed to reset password.');
    }
  );
}

onSubmit() {
  // Check if the form is valid
  if (this.form.valid) {
    // Determine if it's a login or password reset request
    if (this.showResetPassword) {
      // It's a password reset request
      this.resetPassword(); // Call the correct method for password reset
    } else {
      // It's a login request
      var loginRequest = <LoginRequest>{
        userName: this.form.controls['userName'].value,
        password: this.form.controls['password'].value
      };

      console.log('Login button clicked'); // Add this line to log the event

      this.authService.login(loginRequest).subscribe({
        next: result => {
          console.log(result);
          this.loginResult = result;
          if (result.success) {
            localStorage.setItem(this.authService.tokenKey, result.token);
            this.router.navigate(["/"]);
            this.alertify.success('You are successfully logged in');
          }
        },
        error: error => {
          console.log(error);
          if (error.status == 401) {
            loginRequest = error.error;
            this.alertify.error('Invalid username or password');
          }
      }});
    }
  }
}




  onShowResetPassword(): void {
    this.showResetPassword = true;
    this.showForgotPasswordLink = false;
    this.showChangePassword = false;
    this.showChangePasswordLink = true;
    this.resetForm();
  }
  onShowChangePassword() {
    this.showChangePasswordForm = true;
  }
  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const resetPasswordRequest = {
        userName: this.resetPasswordForm.value.resetPasswordUserName,
        newPassword: this.resetPasswordForm.value.newPassword
      };

      this.authService.resetPassword(resetPasswordRequest).subscribe(
        () => {
          // Password reset successfully
          // You can add any additional logic here, such as displaying a success message
          alert('Password reset successfully.');

          // Reset the form
          this.resetPasswordForm.reset();
        },
        (error: any) => {
          // Failed to reset the password
          // You can handle the error here, such as displaying an error message
          console.log(error);
          alert('Failed to reset password.');
        }
      );
    }
  }


  onChangePassword(): void {
    if (this.changePasswordForm.valid && this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmNewPassword) {
      const changePasswordRequest = {
        userName: this.changePasswordForm.value.userName,
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword
      };
      this.authService.changePassword(changePasswordRequest).subscribe(
        () => {
          // Password changed successfully
          // You can add any additional logic here, such as displaying a success message
          alert('Password changed successfully.');

          // Reset the form
          this.changePasswordForm.reset();
        },
        (error) => {
          // Failed to change the password
          // You can handle the error here, such as displaying an error message
          console.log(error);
          alert('Failed to change password.');
        }
      );
    }
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls['userName'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['currentPassword'].setErrors(null);
    this.form.controls['newPassword'].setErrors(null);
    this.form.controls['confirmNewPassword'].setErrors(null);
  }
}
