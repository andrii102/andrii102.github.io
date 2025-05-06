import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { getAuth } from 'firebase/auth';
import { catchError, from, Observable, switchMap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  console.log(`Intercepting ${req.method} request to ${req.url}`);
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return from(user.getIdToken()).pipe(
      switchMap(token => {
        console.log('Attaching token to request');
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      }),
      catchError(error => {
        console.error('Token error:', error);
        return next(req); // Continue without token (will fail on backend)
      })
    );
  }
  console.warn('No user found, proceeding without token')
  return next(req);
};
