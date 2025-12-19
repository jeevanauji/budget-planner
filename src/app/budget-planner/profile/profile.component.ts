import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule, SideNavComponent, CommonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profileForm: any;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      address: ['', Validators.required],
      contact: ['', Validators.required]

    })
  }

  onSubmit(){
    if(this.profileForm.valid){
      console.log(this.profileForm.value)
    }
    else
    {
      this.openSnackBar('Please Fill in all fields correctly','Close')
    }
  }

  openSnackBar(message: string , action: string)
  {
    this.snackBar.open(message,action,{
      duration:3000
    })
  }
}
