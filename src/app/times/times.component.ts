import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit {

  times: any = [];

  constructor() { }

  ngOnInit() {}

  onAddButtonClicked(startTime, finishTime, breakTime) {

    if (!startTime && !finishTime) {
      swal({
        type: 'error',
        title: 'You must enter start and finish times.'
      });
      return;
    }

    this.times.push({
      startTime,
      finishTime,
      breakTime
    });
  }
}
