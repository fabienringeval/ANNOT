import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { ApplicationHttpClient } from '../application-http-client.service';

@Injectable()
export class FileManagerClient extends ApplicationHttpClient {
  constructor(httpHandler: HttpHandler) {
    const url = `${environment.fileManager.https ? 'https' : 'http'}://${environment.fileManager.url}:${environment.fileManager.port}`;
    super(httpHandler, url);
  }
}

export function fileManagerClientCreator(httpHandler: HttpHandler) {
  return new FileManagerClient(httpHandler);
}
