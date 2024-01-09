import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  currentUser: User = new User();
  userGender: string = "";

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['signin']);
    }

    var username = this.userService.getUser();
    if (username == undefined) {
      this.router.navigate(['signin']);
    } else {
      this.userService.getUserByUsername(username).subscribe(user => {
        this.currentUser = user;

        if (this.currentUser.gender == true) {
          this.userGender = "Male";
        } else if (this.currentUser.gender == false) {
          this.userGender = "Female";
        }
      });
    }
  }

  editProfile() {
    if (this.userGender === "Male") {
      this.currentUser.gender = true;
    } else if (this.userGender === "Female") {
      this.currentUser.gender = false;
    } else {
      this.currentUser.gender = undefined;
    }

    if (this.currentUser.username) {
      this.userService.updateUser(this.currentUser.username, this.currentUser).subscribe({
        next: () => {
          this.router.navigateByUrl(`/profile/${this.currentUser.username}`);
          localStorage.setItem('userLoggedIn', this.currentUser.username ?? "");
        },
        error: (error: any) => {
          console.log('Error: ', error);
          window.alert('User Edit Unsuccessful');
        },
        complete: () => {
          console.info("User Successfully Edited");
        }
      });
    } else {
      console.error('Current user has no username. Unable to update user.');
    }
  }
}
