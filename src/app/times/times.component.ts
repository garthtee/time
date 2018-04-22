import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { TimeService } from '../services/time.service';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit {

  times: any = [];
  weeklyHours: number = 38;
  totals: number = 0;
  totalColor: string = 'green';

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    this.refreshTimes();
  }

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
      title: 'Time saved!'
    });

    let time = {
      startTime,
      finishTime,
      breakTime
    };

    this.createTime(time);
  }

  onSettingsButtonClicked() {
    swal({
      title: 'Total hours weekly.',
      input: 'number',
      inputValue: this.weeklyHours.toString(),
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.value) {
        this.weeklyHours = result.value;
      }
    });
  }

  createTime(time) {
    this.timeService.createTime(time).subscribe(
        data => {
          this.refreshTimes();
          return true;
        },
        error => {
          console.error(`Error saving time. ${error}`);
          return Observable.throw(error);
        }
    );
  }

  getAllTimes() {
    this.timeService.getAllTimes().subscribe(
      times => {
        this.times = times.result;
        this.totals = times.total;
        return true;
      },
      error => {
        console.error(`Error getting times. ${error}`);
        return Observable.throw(error);
      }     
    )
  }

  refreshTimes() {
    this.times = this.getAllTimes();
  }

  formatDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm")
  }
}
