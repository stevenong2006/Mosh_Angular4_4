import { BadInput } from '../common/bad-input';

import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

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
    this.service.getAll().subscribe({
      next: response => this.posts = response as any[]
    });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.posts.splice(0, 0, post);
    
    input.value = "";

    this.service.create(post).subscribe({
      next: (res) => {
        // Convert res to json object
        let response = JSON.parse(JSON.stringify(res));
        post["id"] = response.id;
        // console.log(post);
      },
      error: (error: AppError) => {

        this.posts.splice(0, 1);
        // alert("Create failed - error occured");

        if(error instanceof BadInput){
          alert("BadInput occurred.");
          // this.form.setErrors(error.orginalError);
        } 
        else throw error; // Will be captured by the global AppErrorHandler class
      },
    });
  }

  updatePost(post: any) {
    //  Use this if (1) API supports the 'patch' protocol (uncommon)
    // this.service.updateByPatch(post).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   }
    // });

    this.service.update(post).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  deletePost(post: any) {

    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id).subscribe({
    // this.service.delete(345).subscribe({
      // next: ,
      error: (error: AppError) => { 
        this.posts.splice(index, 0, post);
        
        if (error instanceof NotFoundError){
          alert("This post has already been deleted.");
          console.error(error);
        }
        else throw error; // Will be captured by the global AppErrorHandler class
      },
    });
  }
}
