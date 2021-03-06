import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { TimeService } from '../services/time.service';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import * as $ from 'jquery';

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
  theme: string = '#dbdbdb';

  constructor(private timeService: TimeService) { }

  ngOnInit() {
    moment.locale('en-au');
    this.refreshTimes();
  }

  onDeleteAllClicked(): void {
    this.deleteAllTimes();
  }

  onAddClicked(startTime, finishTime, breakTime): void {

    if (!startTime || !finishTime) {
      swal({
        type: 'error',
        title: 'You must enter start and finish times.'
      });
      return;
    }

    let time = { startTime, finishTime, breakTime };

    this.createTime(time);
  }

  /**
   * Gets times from the database.
   */
  refreshTimes(): void {
    this.times = this.getAllTimes();
  }

  onSettingsClicked(): void {
    swal({
      title: 'Total hours weekly',
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

  onChangeThemeClicked(): void {
    swal({
      title: 'Change application theme',
      showCancelButton: true,
      cancelButtonColor: '#666',
      confirmButtonColor: '#dbdbdb',
      confirmButtonText: 'Light',
      cancelButtonText: 'Dark',
      allowOutsideClick: false,
      showCloseButton: false,
    }).then((result) => {
      this.theme = result.value ? '' : '#e5e5e5';
      this.setThemeElementsCSS();      
    });
  }

  onListItemClick(timeId, difference): void {
    this.getTimeById(timeId).then((result) => {

      const time = result as Time;

      const html = `<h4>${this.formatTimeRaw(time.startTime)} - ${this.formatTimeRaw(time.finishTime)}</h4>
        <h4>Break: ${time.breakTime} mins</h4>
        <h4>Total: ${difference}</h4>`;

      swal({
        title: `Time entry - ${this.formatDate(time.startTime)}`,
        html: html,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        showCloseButton: true        
      });
    });
  }

  createTime(time): any {
    this.timeService.createTime(time).subscribe(
        data => {
          this.refreshTimes();
          swal({
            type: 'success',
            title: 'Time saved!'
          });
          return true;
        },
        error => {
          console.error(`Error saving time. ${error}`);
          return Observable.throw(error);
        }
    );
  }

  deleteAllTimes(): void {
    this.timeService.deleteAllTimes().subscribe(
      data => {
        this.refreshTimes();
        swal({
          type: 'success',
          title: 'Times deleted successfully.'
        });
      },
      error => {
        console.error(`Error deleting times. ${error}`);
        return Observable.throw(error);
      }
    );
  }

  getAllTimes(): any {
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

  getTimeById(timeId): Promise<{}> {

    var promise = new Promise((resolve, reject) => {
      this.timeService.getTimeById(timeId).subscribe(
        time => {
          resolve(time.result[0]);
        },
        error => {
          reject('error');
        }
      );
    });
    return promise;
  }

  /**
   * Sets the background colour of all elements on
   * display to follow a theme.
   */
  setThemeElementsCSS(): void {
    $('body').css('background-color', this.theme);
    $('nav').css('background-color', this.theme);
    $('input').css('background-color', this.theme);
    $('.list-group-item').css('background-color', this.theme);
    $('footer').css('background-color', this.theme);
  }

  /**
   * Formats date-time to DD-MM-YYYY HH:mm.
   * @param date 
   */
  formatDateTime(date): string {
    return moment(new Date(date)).format("DD-MM-YYYY HH:mm");
  }

  /**
   * Formats date to DD-MM-YYYY.
   * @param date 
   */
  formatDate(date): string {
    return moment(new Date(date)).format("DD-MM-YYYY");
  }

  formatTime(date): string {
    return moment(new Date(date)).format("HH:mm");
  }

  /**
   * Strips out unrealted values and returns
   * a raw string time value. 
   * @param date
   */
  formatTimeRaw(date): string {

    date = date.substring(date.indexOf("T") + 1);
    date = date.substring(0, 5);
    date = date.replace('T', '');
    date = date.replace('Z', '');

    return date;
  }

  /**
   * Converts time to decimal value.
   * @param timeString time as a string
   */
  getTimeAsDecimal(timeString) {

    if (typeof timeString !== 'string')
      return;

    var time = timeString.replace(':', '.');
    return Number(time);
  }
}