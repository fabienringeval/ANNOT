import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-date',
  templateUrl: './top-date.component.html',
  styleUrls: ['./top-date.component.css']
})
export class TopDateComponent implements OnInit {
  today: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
