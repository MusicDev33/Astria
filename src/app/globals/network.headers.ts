import { HttpHeaders } from '@angular/common/http';

let BaseHeaders = new HttpHeaders();
BaseHeaders = BaseHeaders.set('Content-Type', 'application/json');
BaseHeaders = BaseHeaders.set('AS-User-Agent', 'ASAPIv1');

export { BaseHeaders };
