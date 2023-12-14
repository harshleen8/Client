import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { UserSignUp } from './user-signup/user-signup';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

tokenKey: string = 'jwt-token';
  private _authStatus = new Subject<boolean>();

  public authStatus = this._authStatus.asObservable();

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  constructor(private http: HttpClient) { }

  isAuthenticated() : boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
      var url = environment.baseUrl + '/api/Account';
      return this.http.post<LoginResult>(url, item)
      .pipe(tap((loginResult: LoginResult) => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }
  signup(user: UserSignUp){
    var url = environment.baseUrl;
    return this.http.post(url + '/api/Account/register', user);
  }
  changePassword(changePasswordRequest: any): Observable<any> {
    var url = environment.baseUrl;
    return this.http.post<any>(url + '/api/Account/change-password', changePasswordRequest);
  }
  resetPassword(resetPasswordRequest: any): Observable<any> {
    var url = environment.baseUrl;
    return this.http.post<any>(url + '/api/Account/reset-password', resetPasswordRequest);
  }
}
