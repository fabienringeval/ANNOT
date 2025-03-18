import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-profile-button',
  templateUrl: './create-profile-button.component.html',
  styleUrls: ['./create-profile-button.component.css']
})
export class CreateProfileButtonComponent implements OnInit {
  buttonValue = "Ajouter une categorie";
  @Output() created: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateProfile);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.created.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-create-profile',
  template: `<div>
    <app-form-profile-create (created)="created()" (aborted)="aborted()"></app-form-profile-create>
  </div>`
})
export class DialogCreateProfile {

  constructor(public dialogRef: MatDialogRef<DialogCreateProfile>) {}

  created() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
