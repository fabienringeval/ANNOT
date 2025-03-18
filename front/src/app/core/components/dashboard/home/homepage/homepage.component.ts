import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  dataIcone = { annotation : {}, completed : {}, time : {}};

  constructor() { }

  ngOnInit(): void {
    this.dataIcone.annotation = {icone : 'description', value : '', label : "Nombre d'annotations"}
    this.dataIcone.completed = {icone : 'done', value : '', label : "Terminées"}
    this.dataIcone.time = { icone : 'hourglass_empty', value : '', label : "Temps par annotation"}
  }

}
