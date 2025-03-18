import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingCompany, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-company-button',
  templateUrl: './delete-company-button.component.html',
  styleUrls: ['./delete-company-button.component.css']
})
export class DeleteCompanyButtonComponent implements OnInit, OnDestroy {
  buttonValue = "Supprimer company";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() companyId: number;
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
    const dialogRef = this.dialog.open(DialogDeleteCompany);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingCompany({ companyId: this.companyId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-company',
  template: `<div>
    Voulez-vous vraiment supprimer cette company ?
    <app-button value="Non" (clicked)="abort()"></app-button>
    <app-button value="Oui" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteCompany {

  constructor(public dialogRef: MatDialogRef<DialogDeleteCompany>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}
