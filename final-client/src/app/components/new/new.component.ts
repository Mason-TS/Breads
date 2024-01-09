import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newPost: Post = new Post();

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addPost() {
    this.newPost.username = this.userService.getUser();
    this.newPost.postDate = new Date();
    
    this.postService.createPost(this.newPost).subscribe( {
     next :() => {
      this.router.navigateByUrl('/home');
     }
     , error :(error:any[]) => {
      console.log('Error: ', error);
      window.alert('Post Unsuccessful');
      this.router.navigateByUrl('/login');

     },
     complete :() => {
      console.info("Post Successfully Created");
     }
    });
  }

}
