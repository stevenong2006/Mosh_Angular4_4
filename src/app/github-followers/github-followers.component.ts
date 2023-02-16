import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './../services/github-followers.service';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers!: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  // life-cycle-hook
  ngOnInit() {

    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap(combined => {
          let page = combined[1].get('page');
          let order = combined[1].get('order');
          console.log(`page=${page}, order=${order}`);

          return this.service.getAll();
        })
      )
      .subscribe(Followers => {
        this.followers = Followers;
      })
  }

}
