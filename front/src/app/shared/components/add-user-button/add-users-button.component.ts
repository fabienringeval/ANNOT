import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users-button',
  templateUrl: './add-users-button.component.html',
  styleUrls: ['./add-users-button.component.css']
})
export class AddUsersButtonComponent implements OnInit {
  buttonValue = 'Ajouter un utilisateur';
  @Input() campaignId: number;
  @Output() added: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUsers, { data: { campaignId: this.campaignId }});

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.added.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-add-users',
  template: `<div>
    <app-add-users-form (added)="added()" (aborted)="aborted()" [campaignId]="data.campaignId"></app-add-users-form>
  </div>`
})
export class DialogAddUsers {

  constructor(
    public dialogRef: MatDialogRef<DialogAddUsers>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  added() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
