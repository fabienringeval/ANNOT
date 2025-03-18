import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-company-button',
  templateUrl: './create-company-button.component.html',
  styleUrls: ['./create-company-button.component.css']
})
export class CreateCompanyButtonComponent implements OnInit {
  buttonValue = "Ajouter une entreprise";
  
  @Output() created: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateCompany);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.created.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-create-company',
  template: `<div>
    <app-form-company-create (created)="created()" (aborted)="aborted()"></app-form-company-create>
  </div>`
})
export class DialogCreateCompany {

  constructor(public dialogRef: MatDialogRef<DialogCreateCompany>) {}

  created() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
