import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TimeService {

  // If development else production
  urlPrefix: string = isDevMode() ? 'http://localhost:3000/times' : '/times';

  constructor(private http: Http) { }

  createTime(time) {
    return this.http.post(`${this.urlPrefix}/add/`, time);
  }

  getAllTimes() {
    return this.http.get(`${this.urlPrefix}/all/`)
      .map(res => res.json());
  }

  getTimeById(timeId) {
    return this.http.get(`${this.urlPrefix}/get/id/${timeId}`)
      .map(res => res.json());
  }
}
