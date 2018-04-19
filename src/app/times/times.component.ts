import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { TimeService } from '../services/time.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit {

  times: any = [];

  constructor(private timeService: TimeService) { }

  ngOnInit() {}

  onAddButtonClicked(startTime, finishTime, breakTime) {

    if (!startTime && !finishTime) {
      swal({
        type: 'error',
        title: 'You must enter start and finish times.'
      });
      return;
    }

    swal({
      type: 'success',
      title: 'Start time =  ' + startTime
    });

    let time = {
      startTime,
      finishTime,
      breakTime
    };


    this.times.push(time);

    this.createTime(time);
  }

  createTime(time) {
    this.timeService.createTime(time).subscribe(
        data => {
          // refresh the list
          // this.getFoods();
          return true;
        },
        error => {
          console.error(`Error saving time. ${error}`);
          return Observable.throw(error);
        }
    );
  }
}
