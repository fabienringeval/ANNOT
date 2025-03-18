import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-emotion-button',
  templateUrl: './create-emotion-button.component.html',
  styleUrls: ['./create-emotion-button.component.css']
})
export class CreateEmotionButtonComponent implements OnInit {
  buttonValue = "Ajouter une dimension";
  
  @Output() created: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateEmotion);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.created.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-create-emotion',
  template: `<div>
    <app-form-emotion-create (created)="created()" (aborted)="aborted()"></app-form-emotion-create>
  </div>`
})
export class DialogCreateEmotion {

  constructor(public dialogRef: MatDialogRef<DialogCreateEmotion>) {}

  created() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
