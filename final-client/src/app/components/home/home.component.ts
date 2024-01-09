import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postList: Post[] = [];

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.postList = posts.reverse();
    });
    if (!localStorage.getItem("myPostToken")) {
      localStorage.setItem('loggedOutToken', "he's, out")
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


        