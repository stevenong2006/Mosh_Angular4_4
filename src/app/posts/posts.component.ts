
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts!: any[];


  constructor(private service: PostService) {

  }

  // life-cycle-hook
  ngOnInit() {

    this.service.getPosts()
      .subscribe(res => {
        this.posts = (res as any[]);
        // this.posts = JSON.parse(JSON.stringify(res)); // This also works
        // console.log(this.posts);
      });
  }

  createPost(input: HTMLInputElement) {

    let post: any = { title: input.value };
    input.value = '';

    this.service.createPost(post)
      .subscribe(res => {

        // Convert res to json object
        let response = JSON.parse(JSON.stringify(res));

        post['id'] = response.id
        this.posts.splice(0, 0, post);

        // console.log(post);
      })
  }

  updatePost(post: any) {

    //  Use this if (1) API supports the 'patch' protocol (uncommon)
    this.service.updateByPatch(post)
      .subscribe(res => {
        console.log(res);
      });

    this.service.updateByPutPost(post)
      .subscribe(res => {
        console.log(res);
      });
  }

  deletePost(post: any) {
    this.service.deletePost(post.id)
      .subscribe(res => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        console.log(res);
      })
  }

}
