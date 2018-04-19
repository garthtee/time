import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TimeService {

  constructor(private http: Http) { }

  createTime(time) {
    return this.http.post('http://localhost:3000/times/add/', time);
  }
}
