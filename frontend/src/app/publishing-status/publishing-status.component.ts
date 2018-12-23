import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-publishing-status',
  templateUrl: './publishing-status.component.html',
  styleUrls: ['./publishing-status.component.css']
})
export class PublishingStatusComponent implements OnInit {

  @Input() publishingTimestamp

  constructor() { }

  ngOnInit() {
  }

  hasBeenPublished = timestamp => moment().isAfter(moment.unix(timestamp))

  formatTimestamp = timestamp => {
    const dateTime = moment.unix(timestamp)
    if (moment().isAfter(dateTime)) {
      return dateTime.format('lll')
    }
    return dateTime.fromNow()
  }

}
