import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingProfile, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-profile-button',
  templateUrl: './delete-profile-button.component.html',
  styleUrls: ['./delete-profile-button.component.css']
})
export class DeleteProfileButtonComponent implements OnInit, OnDestroy {
  buttonValue = "Supprimer";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() profileId: number;
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
    const dialogRef = this.dialog.open(DialogDeleteProfile);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingProfile({ profileId: this.profileId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-profile',
  template: `<div>
    Do you want to suppress this categorie ?
    <app-button value="No" (clicked)="abort()"></app-button>
    <app-button value="Yes" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteProfile {

  constructor(public dialogRef: MatDialogRef<DialogDeleteProfile>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}
