import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Emotion, Company, TimeInterval, Profile } from 'src/app/shared/models';
import { 
  State,
  loadingEmotionList,
  getEmotions,
  getCompanies,
  loadingCompanyList,
  getTimeIntervals,
  loadingTimeIntervalList,
  creatingCampaign,
  campaignCreationDone,
  getProfiles,
  loadingProfileList,
  reset
} from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.css']
})


export class CampaignsCreateComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  companies$: Observable<Company[]>;
  
  emotions$: Observable<Emotion[]>;
  emotionList: Emotion[];

  profiles$: Observable<Profile[]>;
  profileList: Profile[];

  timeIntervals$: Observable<TimeInterval[]>;

  created$: Observable<boolean>;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    emotionalAnalysis: new FormControl(0, [Validators.required]),
    emotions: new FormArray([]),
    timeInterval: new FormControl(''),
    minScale: new FormControl(''),
    maxScale: new FormControl(''),
    startValue: new FormControl(''),
    tickInterval: new FormControl(''),
    sliderConfiguration: new FormControl('', [Validators.required]),
    audioTranscription: new FormControl(0, [Validators.required]),
    maxReviewUsers: new FormControl(''),
    reviewPercentage: new FormControl(''),
    profiles: new FormArray([])
  }, [emotionalAnalysisControl, audioTranscriptionControl]);

  showModule = {
    emotionalAnalysis: true,
    annotation: false
  }

  sliderValue = {
    min: 0,
    max: 100,
    tick: 0.01,
    start: 0
  }

  flag: any;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.flag = 1;
    this.companies$ = this.store.pipe(select(getCompanies));
    this.timeIntervals$ = this.store.pipe(select(getTimeIntervals));
    this.created$ = this.store.pipe(select(campaignCreationDone))

    // emotions
    this.emotions$ = this.store.pipe(select(getEmotions));
    
    // profiles
    this.profiles$ = this.store.pipe(select(getProfiles));

    this.subscriptions.push(this.emotions$.subscribe(emotions => {
      if(emotions) {
        this.emotions.clear();
        this.emotionList = emotions;
        emotions.forEach(() => this.emotions.push(new FormControl()))
      }
    }))

    this.subscriptions.push(this.profiles$.subscribe(profiles => {
      if(profiles) {
        this.profiles.clear();
        this.profileList = profiles;
        profiles.forEach(() => this.profiles.push(new FormControl()))
      }
    }))

    this.subscriptions.push(this.created$.subscribe(done => {
      if(done) {
        this.router.navigate(['/annot/campaigns'])
      }
    }))
  }

  get emotions() {
    return this.form.get('emotions') as FormArray;
  }

  get profiles() {
    return this.form.get('profiles') as FormArray;
  }

  ngOnInit(): void {
    this.store.dispatch(loadingEmotionList());
    this.store.dispatch(loadingCompanyList());
    this.store.dispatch(loadingProfileList());
    this.store.dispatch(loadingTimeIntervalList());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(reset());
  }

  radioOnChange($value, type) {
    if ( type === 1) {
      if ( $value.value === 0 ){
        this.showModule.emotionalAnalysis = false;
        this.flag = 0;
      } else {
        this.showModule.emotionalAnalysis = true;
        this.flag = 1;
      }
    }

    if ( type === 2) {
      if ( $value.value === 0 ){
        this.showModule.annotation = false;
      } else {
        this.showModule.annotation = true;
      }
    }
  }

  sliderSettingsOnChange($value, type) {
    const nVal = $value.target.value;
    if ( type === 1) {
      this.sliderValue.min = nVal;
    } else if ( type === 2) {
      this.sliderValue.max = nVal;
    } else if ( type === 3) {
      this.sliderValue.tick = nVal;
    } else if ( type === 4) {
      this.sliderValue.start = nVal;
    }
  }

  sliderOnChange($value){
    const nVal = $value.value;
    this.sliderValue.start = nVal;
  }

  validForm() {
    return !this.form.controls.name.errors &&
      !this.form.controls.company.errors &&
      !this.form.controls.audioTranscription.errors &&
      !this.form.controls.emotionalAnalysis.errors &&
      !this.form.errors;
  }

  submitForm() {    
    if(this.validForm()) {
      let params = {
        name: this.form.controls.name.value,
        company: this.form.controls.company.value,
        emotionalAnalysis: this.flag ,
        audioTranscription: this.form.controls.audioTranscription.value
      }

      if(this.flag === 1) {
        const emotions = [];
        if(this.emotions.value) {
          for(let i = 0; i < this.emotions.length; i++) {
            if(this.emotions.value[i]) {
              emotions.push(this.emotionList[i]);
            }
          }
        }
        params = Object.assign(params, {
          emotions,
          timeInterval: this.form.controls.timeInterval.value,
          minScale: this.form.controls.minScale.value,
          maxScale: this.form.controls.maxScale.value,
          startValue: this.form.controls.startValue.value,
          tickInterval: this.form.controls.tickInterval.value
        })
      }

      if(this.form.controls.audioTranscription.value) {
        params = Object.assign(params, {
          maxReviewUsers: this.form.controls.maxReviewUsers.value,
          reviewPercentage: this.form.controls.reviewPercentage.value
        })
      }
      
      if(this.profiles.value) {
        const profiles = [];
        for(let i = 0; i < this.profiles.length; i++) {
          if(this.profiles.value[i]) {
            profiles.push(this.profileList[i]);
          }
        }
        params = Object.assign(params, { profiles })
      }

      this.store.dispatch(creatingCampaign(params))
    }
  }
}

function emotionalAnalysisControl(g: FormGroup) {
  return g.get('emotionalAnalysis').value &&
    (
      !g.get('emotions').value &&
      !g.get('timeInterval').value &&
      !g.get('minScale').value &&
      !g.get('maxScale').value &&
      !g.get('startValue').value &&
      !g.get('tickInterval'
    )) ? { 'missingParams': true } : null;
}

function audioTranscriptionControl(g: FormGroup) {
  return g.get('audioTranscription').value &&
    (
      !g.get('maxReviewUsers').value &&
      !g.get('reviewPercentage').value
    ) ? { 'missingParams': true } : null;
}
 