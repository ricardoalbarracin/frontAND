import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  mood = 1;
  size = 16
  constructor() {
    this.size = parseInt(getComputedStyle(document.documentElement).fontSize);
   }

  ngOnInit() {
  }

  private contrast() {
    if (this.mood === 1) {
      document.body.classList.add('all');
      this.mood++;
    } else {
      document.body.classList.remove('all');
      this.mood--;
    }
  }

  private minFont(){
     if (this.size > 10) {
      this.size--;
      const font = this.size.toString();
      document.querySelector('html').style.fontSize = font + 'px';
    }
  }
  private maxFont() {
    if (this.size > 10) {
      this.size++;
      const font = this.size.toString();
      document.querySelector('html').style.fontSize = font +'px';
    }
  }

}
