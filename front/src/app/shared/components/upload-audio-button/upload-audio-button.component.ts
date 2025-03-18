import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-audio-button',
  templateUrl: './upload-audio-button.component.html',
  styleUrls: ['./upload-audio-button.component.css']
})
export class UploadAudioButtonComponent implements OnInit {
  buttonValue = "Ajouter un fichier";
  buttonIcon = "add";
  
  @Input() campaignId: number;
  @Output() uploaded: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog() {
    let config = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogUploadAudio, config);

    dialogRef.componentInstance.campaignId = this.campaignId;

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.uploaded.emit(true);
    });
  }
  
  ngOnInit(): void {}

}

@Component({
  selector: 'dialog-upload-audio',
  template: `<div>
    <app-audio-upload (uploaded)="uploaded()" (aborted)="aborted()" [campaignId]="campaignId"></app-audio-upload>
  </div>`
})
export class DialogUploadAudio {
  campaignId: number;

  constructor(public dialogRef: MatDialogRef<DialogUploadAudio>) {}

  uploaded() {
    this.dialogRef.close(true);
  }

  aborted() {
    this.dialogRef.close();
  }
}
