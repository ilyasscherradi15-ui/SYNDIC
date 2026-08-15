import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in initially', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should store token and user after successful login', () => {
    const mockResponse = {
      user: { id: 1, name: 'Admin Test', email: 'admin@test.com', role: 'admin' },
      token: '1|faketoken123',
    };

    service.login('admin@test.com', 'password123').subscribe((res) => {
      expect(res.token).toBe('1|faketoken123');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(service.getToken()).toBe('1|faketoken123');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser()?.role).toBe('admin');
  });

  it('should clear session on logout', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test', email: 'test@test.com', role: 'admin' }));

    service.logout();

    const req = httpMock.expectOne(`${environment.apiUrl}/logout`);
    req.flush({});

    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
  });
});
