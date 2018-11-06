import {Component, Input, OnInit} from '@angular/core'


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() text: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
    console.log(this.color)
  }

}
