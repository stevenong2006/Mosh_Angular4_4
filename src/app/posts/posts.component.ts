import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  posts!: any[];

  constructor(http: HttpClient) {

    http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(res => {

        this.posts = (res as any[]);

        // this.posts = JSON.parse(JSON.stringify(res));
        // console.log(this.posts);
      });

  }

}
