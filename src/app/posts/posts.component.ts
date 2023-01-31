
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import {Post, PostInfo} from '../model/post';

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  // postInfo = new PostInfo();
  // posts = new Array<Post>();

  posts!: any[];

  constructor(private service: PostService) {}

  // life-cycle-hook
  ngOnInit() {
    this.service.getPosts().subscribe({
      next: (response) => {
        // console.log(response);
        this.posts = response as any[];
        this.posts = JSON.parse(JSON.stringify(response)); // This also works
        console.log(this.posts);
      },
      error: (error) => {
        alert("An unexpected error occurred.");
        console.log(error);
      },
    });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = "";

    this.service.createPost(post).subscribe({
      next: (res) => {
        // Convert res to json object
        let response = JSON.parse(JSON.stringify(res));

        post["id"] = response.id;
        this.posts.splice(0, 0, post);

        // console.log(post);
      },
      error: (error) => {
        alert("An unexpected error occurred.");
        console.log(error);
      },
    });
  }

  updatePost(post: any) {
    //  Use this if (1) API supports the 'patch' protocol (uncommon)
    this.service.updateByPatch(post).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        alert("An unexpected error occurred.");
        console.log(error);
      },
    });

    this.service.updateByPutPost(post).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        alert("An unexpected error occurred.");
        console.log(error);
      },
    });
  }

  deletePost(post: any) {
    // this.service.deletePost(post.id)
    this.service.deletePost(345).subscribe({
      next: (res) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 404) alert("This post has already been deleted.");
        else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
