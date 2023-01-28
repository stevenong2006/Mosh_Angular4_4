import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  posts!: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {

    http.get(this.url)
      .subscribe(res => {

        this.posts = (res as any[]);
        // this.posts = JSON.parse(JSON.stringify(res));
        // console.log(this.posts);
      });

  }

  createPost(input: HTMLInputElement) {

    let post: any = { title: input.value };
    input.value = '';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(res => {

        // Convert res to json object
        let response = JSON.parse(JSON.stringify(res));

        post['id'] = response.id
        this.posts.splice(0, 0, post);

        // console.log(post);
      })
  }

  updatePost(post: any) {

    //  Use this if (1) API supports it (uncommon)
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
    //   .subscribe(res => {
    //     console.log(res);
    //   })
    this.http.put(this.url + '/' + post.id, JSON.stringify(post))
      .subscribe(res => {
        console.log(res);
      });
  }

}
