import { Component } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  isFavorite: boolean;

  constructor() {
    this.isFavorite = false;
  }

  onClick() {
    this.isFavorite = !this.isFavorite;
  }

}
