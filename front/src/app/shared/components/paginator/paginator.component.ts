import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() length: number;
  @Input() pageSize: number = 25;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() showFirstLastButtons: boolean = true;
  @Output() pageUp: EventEmitter<{}> = new EventEmitter<{}>();

  constructor() { }

  ngOnInit(): void {}

  selectPage(page) {
    this.pageUp.emit(page);
  }

}
