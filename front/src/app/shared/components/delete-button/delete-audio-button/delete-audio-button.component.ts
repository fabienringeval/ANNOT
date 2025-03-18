import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingAudio, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-audio-button',
  templateUrl: './delete-audio-button.component.html',
  styleUrls: ['./delete-audio-button.component.css']
})
export class DeleteAudioButtonComponent implements OnInit, OnDestroy {
  buttonValue = "Supprimer";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() audioId: number;
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();

  deleted$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private store: Store<State>
  ) {
    this.deleted$ = this.store.pipe(select(isDone))
    this.deleted$.subscribe(done => {
      if(done) {
        this.deleted.emit();
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDeleteAudio);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingAudio({ audioId: this.audioId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-audio',
  template: `<div>
    Voulez-vous vraiment supprimer cet interval de temps?
    <app-button value="Non" (clicked)="abort()"></app-button>
    <app-button value="Oui" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteAudio {

  constructor(public dialogRef: MatDialogRef<DialogDeleteAudio>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}
