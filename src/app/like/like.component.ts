import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input('likesCount') likesCount: number = 0;
  @Input('isActive') isActive: boolean = false;

  // constructor() {
  //   this.likesCount = 10;
  //   this.isActive = false;
  // }

  onClick() {
    this.likesCount += (this.isActive) ? -1 : 1;
    this.isActive = !this.isActive;
  }

}
