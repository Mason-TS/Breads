import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentPost: Post = new Post();
  id:number = 0;
  idString: string = "0";

  constructor(private postService: PostService, private userService: UserService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const routeID = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeID);
    this.idString = routeID;
    this.postService.getPost(this.idString).subscribe(post => {
      this.currentPost = post;
    })
  }

    editPost() {

    this.postService.updatePost(this.currentPost).subscribe( {
     next :() => {
      this.router.navigateByUrl('/home');
     }
     , error :(error:any[]) => {
      console.log('Error: ', error);
      window.alert('Post Edit Unsuccessful');
      this.router.navigateByUrl('/home');
     },
     complete :() => {
      console.info("Post Successfully Editted");
     }
    });
  }

}