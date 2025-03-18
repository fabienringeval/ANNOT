import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State, deletingCampaign, isDone } from './store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-campaign-button',
  templateUrl: './delete-campaign-button.component.html',
  styleUrls: ['./delete-campaign-button.component.css']
})
export class DeleteCampaignButtonComponent implements OnInit, OnDestroy {
  buttonValue = "";
  buttonIcon = "delete";
  buttonIconRight = true;
  buttonType = "flat";
  buttonColor = "warn";
  subscriptions: Subscription[] = [];
  @Input() campaignId: number;
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
    const dialogRef = this.dialog.open(DialogDeleteCampaign);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.store.dispatch(deletingCampaign({ campaignId: this.campaignId }));
    });
  }
  
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

@Component({
  selector: 'dialog-delete-campaign',
  template: `<div>
    Voulez-vous vraiment supprimer cette campagne?
    <app-button value="Non" (clicked)="abort()"></app-button>
    <app-button value="Oui" (clicked)="delete()"></app-button>
  </div>`
})
export class DialogDeleteCampaign {

  constructor(public dialogRef: MatDialogRef<DialogDeleteCampaign>) {}

  delete() {
    this.dialogRef.close(true);
  }

  abort() {
    this.dialogRef.close();
  }
}