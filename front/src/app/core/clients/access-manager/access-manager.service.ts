import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { ApplicationHttpClient } from '../application-http-client.service';

@Injectable()
export class AccessManagerClient extends ApplicationHttpClient {
  constructor(httpHandler: HttpHandler) {
    const conf = environment.api;
    const url = `${conf.https ? 'https' : 'http'}://${conf.url}:${conf.port}/${conf.version}`;
    super(httpHandler, url);
  }
}

export function accessManagerClientCreator(httpHandler: HttpHandler) {
  return new AccessManagerClient(httpHandler);
}
