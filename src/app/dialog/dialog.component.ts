import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  employeeForm!: FormGroup;
  actionBtn : string= "Save"
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }
  
  ngOnInit(): void {
    this.employeeForm =this.formBuilder.group({
      employeeId : ['',Validators.required],
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      emailId : ['',Validators.required],
      salary : ['',Validators.required],

    })
    if(this.editData){
      this.actionBtn ="Update"
      this.employeeForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['emailId'].setValue(this.editData.emailId);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
    }
  }
  addEmployee(){ 
    if(!this.editData){
    if(this.employeeForm.valid){
      this.api.postEmployee(this.employeeForm.value)
      .subscribe({
        next:(res)=>{
         alert("Employee details added successfully")
         this.employeeForm.reset();
         this.dialogRef.close('save');
        },
       error:()=>{
        alert("Error while adding Employee details")

       }
      })
    }
  } else{
    this.updateData()
  }
}
updateData(){
  this.api.putData(this.employeeForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
     alert("Employee details updated successfully")
     this.employeeForm.reset();
     this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating Employee details")

     }
  })

}
}
