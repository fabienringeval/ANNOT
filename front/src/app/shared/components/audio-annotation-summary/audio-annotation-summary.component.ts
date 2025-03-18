import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {SliderComponent} from '../slider/slider.component';
import {Observable} from 'rxjs';
import {SliderConfiguration} from '../../models';
import {select, Store} from '@ngrx/store';
import {
  getSliderConfiguration,
  loadingEmotionalAnalysisSliderConfiguration,
  loadingEmotionalAnalysisTimeInterval,
  State
} from '../emotion-annotator/store';

@Component({
  selector: 'app-audio-annotation-summary',
  templateUrl: './audio-annotation-summary.component.html',
  styleUrls: ['./audio-annotation-summary.component.css']
})
export class AudioAnnotationSummaryComponent implements OnInit, OnChanges {
  @Input() campaignId: number;
  @Input() currentEmotion;
  @Output() summarised: EventEmitter<number> = new EventEmitter();

  @ViewChild(SliderComponent) slider;

  sliderConfig$: Observable<SliderConfiguration>;

  sliderValue: number;
  sliderInitValue: number;

  emotionToImg: string = null;

  submitButtonLabel = 'soumettre';

  constructor(
      private store: Store<State>

  ) {
    this.sliderConfig$ = this.store.pipe(select(getSliderConfiguration));
    this.sliderConfig$.subscribe(sliderConfig => {
      if (sliderConfig) {
        this.sliderValue = this.sliderInitValue = sliderConfig.startValue;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadingEmotionalAnalysisSliderConfiguration({ campaignId: this.campaignId }));
    this.store.dispatch(loadingEmotionalAnalysisTimeInterval({ campaignId: this.campaignId }));

    console.log(this.currentEmotion);
    if ( this.currentEmotion !== null ) {
      this.emotionToImg = this.currentEmotion.name;
     }
  }

  ngOnChanges() {
    console.log(this.currentEmotion);

    if (this.currentEmotion !== null) {
      this.emotionToImg = this.currentEmotion.name;
      console.log(this.emotionToImg);

    }
  }
   updateSliderValue($event) {
    this.sliderValue = $event;
    console.log('value ' + this.sliderValue);
  }

  validSummary() {
    this.summarised.emit(this.sliderValue);
    console.log(this.summarised);
  }
}
