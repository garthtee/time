import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TimeService {

  constructor(private http: Http) { }

  createTime(time) {
    return this.http.post('http://localhost:3000/times/add/', time);
  }

  getAllTimes() {
    // return this.http.get('http://localhost:3000/times/all/');
    return this.http.get('http://localhost:3000/times/all/')
      .map(res => res.json());
  }
}
