import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TimeService {

  // If development, use this url prefix
  urlPrefix: string = isDevMode() ? 'http://localhost:3000' : '';

  constructor(private http: Http) { }

  createTime(time) {
    return this.http.post(`${this.urlPrefix}/times/add/`, time);
  }

  getAllTimes() {
    return this.http.get(`${this.urlPrefix}/times/all/`)
      .map(res => res.json());
  }
}
