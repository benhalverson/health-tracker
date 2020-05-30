import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor() {}
  onStop(): void {
    clearInterval(this.timer);
  }
  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress += 20;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
