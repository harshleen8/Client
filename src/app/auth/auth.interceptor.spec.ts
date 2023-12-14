import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, AuthInterceptor]
    });
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should add Authorization header when token is available', () => {
    const token = 'mockToken';
    spyOn(authService, 'getToken').and.returnValue(token);

    TestBed.inject(AuthInterceptor);

    httpMock.expectOne(req => {
      return req.headers.has('Authorization') && req.headers.get('Authorization') === `Bearer ${token}`;
    });
  });

  it('should perform logout and navigate to login page on 401 Unauthorized response', () => {
    TestBed.inject(AuthInterceptor);
    const authServiceSpy = spyOn(authService, 'logout');
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');

    httpMock.expectOne('testUrl').flush('', { status: 401, statusText: 'Unauthorized' });

    expect(authServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
