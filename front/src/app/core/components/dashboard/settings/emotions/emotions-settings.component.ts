import { Component, OnInit, ViewChild } from '@angular/core';
import { TableEmotionsComponent } from 'src/app/shared/components/table/table-emotions/table-emotions.component';

@Component({
  selector: 'app-emotions-settings',
  templateUrl: './emotions-settings.component.html',
  styleUrls: ['./emotions-settings.component.css']
})
export class EmotionsSettingsComponent implements OnInit {
  @ViewChild(TableEmotionsComponent) tableEmotions;

  constructor() { }

  ngOnInit(): void {}

  reloadEmotionList() {
    this.tableEmotions.loadEmotionList();
  }
}
