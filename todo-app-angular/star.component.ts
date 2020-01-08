import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  starClassName = 'star-rating-blank';
  @Input() starId;
  @Input() rating;

  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log(this.starId);
    console.log(this.rating);

    if (this.rating >= this.starId) {
      this.starClassName = 'star-rating-color';
    }
  }

  onEnter() {
    this.enter.emit(this.starId);
  }

  onLeave() {
    this.leave.emit(this.starId);
  }

  starClicked() {
    this.bigClick.emit(this.starId);
  }
}
