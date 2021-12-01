import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor  {

  constructor() {
    console.log("INTERCEPTOR CONSTRUCTOR");
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    request = request.clone({
      withCredentials: true
  });
  return next.handle(request);
  }
}
