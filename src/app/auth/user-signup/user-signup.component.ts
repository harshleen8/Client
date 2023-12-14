import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserSignUp } from './user-signup';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signUpForm!: FormGroup;
    user!: UserSignUp;
    userSubmitted!: boolean;
    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private alertify: AlertifyService ) { }

    ngOnInit() {
        this.createRegisterationForm();
    }

    createRegisterationForm() {
      this.signUpForm = this.fb.group({
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.maxLength(10)]]
      });

      const passwordControl = this.signUpForm.get('password');
      const confirmPasswordControl = this.signUpForm.get('confirmPassword');

      if (passwordControl && confirmPasswordControl) {
        confirmPasswordControl.setValidators(this.passwordMatchingValidatior(passwordControl));
        confirmPasswordControl.updateValueAndValidity();
      }
    }

    passwordMatchingValidatior(passwordControl: AbstractControl): ValidatorFn {
      return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
        if (passwordControl.value !== confirmPasswordControl.value) {
          return { notmatched: true };
        }
        return null;
      };
    }




    onSubmit() {
        console.log(this.signUpForm.value);
        this.userSubmitted = true;

        if (this.signUpForm.valid) {
            // this.user = Object.assign(this.user, this.registerationForm.value);
            this.authService.signup(this.userData()).subscribe(() =>
            {
                this.onReset();
                this.router.navigate(["/"]);
                this.alertify.success('Congrats, you are successfully registered');
            });
        }
    }

    onReset() {
      console.log(Error);
        this.userSubmitted = false;
        this.signUpForm.reset();
    }


    userData(): UserSignUp {
        return this.user = {
            userName: this.userName.value,
            email: this.email.value,
            password: this.password.value,
            mobile: this.mobile.value
        };
    }

    // ------------------------------------
    // Getter methods for all form controls
    // ------------------------------------
    get userName() {
        return this.signUpForm.get('userName') as FormControl;
    }

    get email() {
        return this.signUpForm.get('email') as FormControl;
    }
    get password() {
        return this.signUpForm.get('password') as FormControl;
    }
    get confirmPassword() {
        return this.signUpForm.get('confirmPassword') as FormControl;
    }
    get mobile() {
        return this.signUpForm.get('mobile') as FormControl;
    }

}
