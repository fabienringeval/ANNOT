import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-button',
  templateUrl: './create-user-button.component.html',
  styleUrls: ['./create-user-button.component.css']
})
export class CreateUserButtonComponent implements OnInit {
  buttonValue = "Ajouter un utilisateur";
  @Output() created: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateUser);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.created.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-create-user',
  template: `<div>
    <app-form-user-create (created)="created()" (aborted)="aborted()"></app-form-user-create>
  </div>`
})
export class DialogCreateUser {

  constructor(public dialogRef: MatDialogRef<DialogCreateUser>) {}

  created() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
