import { HttpHeaders } from '@angular/common/http';

let BaseHeaders = new HttpHeaders();
BaseHeaders = BaseHeaders.set('Content-Type', 'application/json');
BaseHeaders = BaseHeaders.set('AS-User-Agent', 'ASAPIv1');

const BaseHeaderFunc = (jwt: string) => {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('AS-User-Agent', 'ASAPIv1');
  headers = headers.set('ID-JWT', jwt);
  return headers;
};

export { BaseHeaders, BaseHeaderFunc };
