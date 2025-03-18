import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaigns-homepage',
  templateUrl: './campaigns-homepage.component.html',
  styleUrls: ['./campaigns-homepage.component.css']
})
export class CampaignsHomepageComponent implements OnInit {
  dataIcone = { annotation : {}, completed : {}, time : {}};

  constructor() { }

  ngOnInit(): void {
    this.dataIcone.annotation = {icone : 'description', value : 92, label : "Total annotations"}
    this.dataIcone.completed = {icone : 'done', value : 92, label : "Completed"}
    this.dataIcone.time = { icone : 'hourglass_empty', value : 92, label : "Time by annotation"}
  }

}
