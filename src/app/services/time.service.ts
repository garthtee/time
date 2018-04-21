import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TimeService {

  constructor(private http: Http) { }

  createTime(time) {
    return this.http.post('/times/add/', time);
  }

  getAllTimes() {
    return this.http.get('/times/all/')
      .map(res => res.json());
  }
}
