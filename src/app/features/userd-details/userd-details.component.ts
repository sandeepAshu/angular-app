import { Component, Inject, Input } from '@angular/core';
import { User } from '../../core/services/user.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HighlightDirective } from '../../common/directives/highlight.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-userd-details',
  standalone:true,
  imports:[   
    MatPaginatorModule,  // <-- Add this here
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './userd-details.component.html',
  styleUrl: './userd-details.component.scss'
})
export class UserdDetailsComponent {
  userDetailsForm!:FormGroup
  allUsers:any ={};
  // @Input() user!: User;
  constructor(
    @Inject(MAT_DIALOG_DATA) public userDetails:any,
    private fb:FormBuilder
   ){}

   ngOnInit(){
    console.log(this.userDetails)
    this.userDetailsForm = this.fb.group({
      id: [this.userDetails.id, Validators.required],
      name: [this.userDetails.name, [Validators.required, Validators.minLength(3)]],
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      phone: [this.userDetails.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username:[this.userDetails.username],
      website:[this.userDetails.website],
      street: [this.userDetails.address?.street, Validators.required],
      suite: [this.userDetails.address?.suite, Validators.required],
      city: [this.userDetails.address?.city, Validators.required],
      zipcode: [this.userDetails.address?.zipcode, Validators.required],
      companyName: [this.userDetails.company?.name, Validators.required],
      catchPhrase: [this.userDetails.company?.catchPhrase, Validators.required],
      bs: [this.userDetails.company?.bs, Validators.required],
    });

    this.userDetailsForm.disable()
   }
}
