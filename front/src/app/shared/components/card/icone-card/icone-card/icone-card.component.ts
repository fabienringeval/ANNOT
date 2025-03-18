import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icone-card',
  templateUrl: './icone-card.component.html',
  styleUrls: ['./icone-card.component.css']
})
export class IconeCardComponent implements OnInit {

  @Input() dataIcone;

  constructor() { }

  ngOnInit(): void {}

}
