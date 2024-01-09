import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-sign-in',
 templateUrl: './sign-in.component.html',
 styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

 username: string = '';
 password: string = '';

 constructor(private userService: UserService, private router: Router) { }

 ngOnInit(): void {
 }

 signin(){
   this.userService.login(this.username, this.password).subscribe( {
    next :() => {
      this.router.navigateByUrl('/home');
    }
    , error :(error:any[]) => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
      this.router.navigateByUrl('/signin');
      this.userService.setLoginUser(undefined);
    },
    complete :() => {
      console.info("Successful Login");
      console.log(this.username + " sign-in.ts");
      this.router.navigateByUrl('/home');
    }
   });
 }
}


// .subscribe( {
//   next :() => {

//   }
//   , error :(error:any[]) => {

//   },
//   complete :() => {

//   }
//  });

// ((response:any) => {
//   this.router.navigateByUrl('/home');
// }, error => {
//   console.log('Error: ', error);
//   window.alert('Unsuccessful Login');
//   this.router.navigateByUrl('/signin');
// });