import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUsersComponent } from 'src/app/shared/components/table/table-users/table-users.component';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
  @ViewChild(TableUsersComponent) tableUsers;

  constructor() {}
  
  ngOnInit(): void {}

  reloadUserList() {
    this.tableUsers.loadUserList();
  }

}