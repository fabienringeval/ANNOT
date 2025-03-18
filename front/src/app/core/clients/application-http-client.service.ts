import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { IRequestOptions } from 'src/app/shared/interfaces/httpRequestOptions.interface';

@Injectable()
export class ApplicationHttpClient extends HttpClient {
  private url;

  constructor(httpHandler: HttpHandler, @Inject(String) url: string) {
    super(httpHandler);
    this.url = url;
  }

  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.get<T>(this.url + '/' + endPoint, options);
  }

  public Post<T>(endPoint: string, params: any, options?: IRequestOptions): Observable<T> {
    return this.post<T>(this.url + '/' + endPoint, params, options);
  }

  public Put<T>(endPoint: string, params: any, options?: IRequestOptions): Observable<T> {
    return this.put<T>(this.url + '/' + endPoint, params, options);
  }

  public Patch<T>(endPoint: string, params: any | HttpParams, options?: IRequestOptions): Observable<T> {
    return this.patch<T>(this.url + '/' + endPoint, params, options);
  }

  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.delete<T>(this.url + '/' + endPoint, options);
  }

  public GetUrl(): string {
    return this.url;
  }

}
