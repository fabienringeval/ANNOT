import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { ApplicationHttpClient } from '../application-http-client.service';

@Injectable()
export class VianoteApiClient extends ApplicationHttpClient {
  constructor(httpHandler: HttpHandler) {
    const url = `${environment.api.https ? 'https' : 'http'}://${environment.api.url}:${environment.api.port}`;
    super(httpHandler, url);
  }
}

export function vianoteApiClientCreator(httpHandler: HttpHandler) {
  return new VianoteApiClient(httpHandler);
}
