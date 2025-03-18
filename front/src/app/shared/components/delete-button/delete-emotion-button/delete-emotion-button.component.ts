import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingEmotion, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-emotion-button',
  templateUrl: './delete-emotion-button.component.html',
  styleUrls: ['./delete-emotion-button.component.css']
})
export class DeleteEmotionButtonComponent implements OnInit, OnDestroy {
  buttonValue = "Supprimer dimension";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() emotionId: number;
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
    const dialogRef = this.dialog.open(DialogDeleteEmotion);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingEmotion({ emotionId: this.emotionId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-emotion',
  template: `<div>
    Voulez vous vraiment supprimer cette dimension ?
    <app-button value="Non" (clicked)="abort()"></app-button>
    <app-button value="Oui" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteEmotion {

  constructor(public dialogRef: MatDialogRef<DialogDeleteEmotion>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}
