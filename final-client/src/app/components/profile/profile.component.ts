import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService, private router: Router, private actRoute: ActivatedRoute) { }

  username:string = "";
  currentProfile: User = new User();
  loggedIn:boolean = false;
  isCurrentUser:boolean = false;
  userGender?:string;

  postList: Post[] = [];

  ngOnInit(): void {
    const routeID = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.username = routeID
    console.log(routeID);

    this.postService.getPostsByUsername(this.username).subscribe(posts => {
      this.postList = posts.reverse();
      console.log(posts);
    });

    this.userService.getUserByUsername(this.username).subscribe(user => {
      this.currentProfile = user;
      if (user.gender == true) {
        this.userGender = "Male";
      } else if (user.gender == false) {
        this.userGender = "Female";
      }
    });

    if (this.userService.isLoggedIn()) {
      console.log("loggedintrue profile.ts")
      this.loggedIn = true;
      console.log(this.username + "current");
      console.log(this.userService.getUser() + " user");
      if (this.username == this.userService.getUser()) {
        this.isCurrentUser = true;
      }
    }
  }

  usernameCheck(username: string | undefined): boolean {
    if (username == this.userService.getUser()) {
      return true;
    }
    return false;
  }

  deletePost(postId: string | undefined) {
    if (postId != undefined) {
      if (confirm('Do you want to delete your post?')) {
        this.postService.deletePost(postId).subscribe( {
            next :() => {
              this.postService.getAllPosts().subscribe(posts => {
                this.postList = posts;
              });
            }
            , error :(error:any[]) => {
              console.log('Error: ', error);
              window.alert('Unsuccessful Deletion');
            },
            complete :() => {
              console.info("Post Deleted Successfully");
            }
           });
      }
    }
  }

}
