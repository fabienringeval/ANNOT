import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-time-interval-button',
  templateUrl: './create-time-interval-button.component.html',
  styleUrls: ['./create-time-interval-button.component.css']
})
export class CreateTimeIntervalButtonComponent implements OnInit {
  buttonValue = "Ajouter une intervalle de temps";
  
  @Output() created: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateTimeInterval);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.created.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-create-time-interval',
  template: `<div>
    <app-form-time-interval-create (created)="created()" (aborted)="aborted()"></app-form-time-interval-create>
  </div>`
})
export class DialogCreateTimeInterval {

  constructor(public dialogRef: MatDialogRef<DialogCreateTimeInterval>) {}

  created() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
