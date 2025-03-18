import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingTimeInterval, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-time-interval-button',
  templateUrl: './delete-time-interval-button.component.html',
  styleUrls: ['./delete-time-interval-button.component.css']
})
export class DeleteTimeIntervalButtonComponent implements OnInit, OnDestroy {
  buttonValue = "Supprimer l'intervalle";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() timeIntervalId: number;
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
    const dialogRef = this.dialog.open(DialogDeleteTimeInterval);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingTimeInterval({ timeIntervalId: this.timeIntervalId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-time-interval',
  template: `<div>
    Voulez-vous vraiment supprimer cet interval de temps?
    <app-button value="Non" (clicked)="abort()"></app-button>
    <app-button value="Oui" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteTimeInterval {

  constructor(public dialogRef: MatDialogRef<DialogDeleteTimeInterval>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}
