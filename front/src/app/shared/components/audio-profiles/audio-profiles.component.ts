import {Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject, OnDestroy} from '@angular/core';
import {SimpleplayerComponent} from 'src/app/shared/components/simpleplayer/simpleplayer.component';
import {Observable, Subscription} from 'rxjs';
import {Profile, Audio, SliderConfiguration, TimeInterval, User} from 'src/app/shared/models';
import {Store, select} from '@ngrx/store';
import {loadingProfileList, getProfileList, State} from './store';
import * as _ from 'underscore';
import {SimplevideoPlayerComponent} from '../simplevideo-player/simplevideo-player.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SliderComponent} from '../slider/slider.component';
import {Pipe, PipeTransform} from '@angular/core';
import {TokenService} from '../../../core/services';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
    selector: 'app-audio-profiles',
    templateUrl: './audio-profiles.component.html',
    styleUrls: ['./audio-profiles.component.css']
})

export class AudioProfilesComponent implements OnInit {
    @Input() campaignId: number;
    @Input() audioData: Audio;
    @Output() valid: EventEmitter<{ profileId: number, labelId: number }[]> = new EventEmitter();
    @Output() empty: EventEmitter<void> = new EventEmitter();

    @ViewChild(SimpleplayerComponent) audioPlayer;

    @ViewChild(SimplevideoPlayerComponent) videoPlayer;

    @ViewChild(SliderComponent) slider;

    subscriptions: Subscription[] = [];
    profiles$: Observable<Profile[]>;
    profiles: { profileId: number, labelId: number, value: number }[] = [];
    isLoading = false;
    submitButtonLabel = 'soumettre';
    audioFinished = false;
    audioInProgress = false;
    videoFinished = false;
    videoInProgress: false;
    playButtonType = 'fab';
    playButtonIcon = 'play_arrow';
    playButtonColor = 'primary';

    stopButtonType = 'fab';
    stopButtonIcon = 'replay';
    stopButtonColor = 'warn';
    isVisible = false;

    tiles = [];

    sliderConfig$: Observable<SliderConfiguration>;
    timeInterval$: Observable<TimeInterval>;


    sliderValue: number;
    sliderInitValue: number;
    profileValue = 0;

    action = 1;
    test: Profile;
    testLabel: any;

    isLongPress: boolean;
    selected: any;

    constructor(
        private store: Store<State>,
        private dialog: MatDialog,
        public tokenService: TokenService,
    ) {
        this.profiles$ = this.store.pipe(select(getProfileList));
        console.log('audio');
        console.log(this.audioData);
        this.profiles$.subscribe(profiles => {
            if (profiles) {
                this.isLoading = false;
                if (!profiles.length) {
                    this.empty.emit();
                } else {
                    this.profiles = _.map(profiles, profile => ({profileId: profile.id, labelId: null, value: 0}));
                }
            }
        });
    }

    ngOnInit(): void {
        this.loadProfileList();
        console.log('audio');
        console.log(this.audioData);
        console.log(this.audioPlayer);
    }

    updateProfile(profile, {value: label}) {
        // this.profiles = _.reject(this.profiles, ({profileId}) => profileId === profile.id);

        this.test = profile;
        this.testLabel = label;
        this.profiles.push({profileId: this.test.id, labelId: this.testLabel.id, value: 0});

        console.log('category : ' + profile.name);
        // timestamp
        console.log('label ' + label.label);
        console.log(this.profiles);
    }

    loadProfileList(): void {
        this.isLoading = true;
        this.store.dispatch(loadingProfileList({campaignId: this.campaignId}));
    }

    isValid() {
        return !_.some(this.profiles, ({labelId}) => !labelId);
    }

    validProfiles() {
        if (this.isValid) {
            this.valid.emit(this.profiles);
        }
    }

    startAudio() {
        this.playAudio();
    }

    playAudio() {
        this.audioPlayer.play();
    }

    stopAudio() {
        this.audioPlayer.stop();
        this.audioInProgress = false;
    }

    playVideo() {
        this.videoPlayer.play();
    }

    stopVideo() {
        this.videoPlayer.stop();
        this.videoInProgress = false;
    }


    getTimeStamp() {
        return this.videoPlayer.getTimeStamp();
    }


    openSliderDialog() {
        const dialogRef = this.dialog.open(DialogSliderCategory, {
            panelClass: '.custom-dialog',
        });
    }

    display() {
        // this.isVisible = !this.isVisible;
        this.isVisible = true;
        setTimeout(() => {
             this.slider.lockCursor();
        }, 10);
        console.log(this.isVisible);
        return this.isVisible;
    }


    hide() {
        const matchingProfile = this.profiles.find(({profileId, labelId}) => profileId === this.test.id && labelId === this.testLabel.id);
        const span = this.selected.children[0];
        const spanChild = span.children[0];

        try {
            if (matchingProfile.value === 0) {
                this.unSelected(this.selected);
                matchingProfile.labelId = null;
            }

            spanChild.children[1].innerText = ' ' + matchingProfile.value;
            this.sliderValue = 0;
            this.isVisible = false;
            return this.isVisible;

        }catch (error) {
            console.log('error');
            this.unSelected(this.selected);
            this.isVisible = false;
            return this.isVisible;
        }
    }

    onLongPress(profile, label) {

        this.isLongPress = true;
        this.display();
        this.test = profile;
        this.testLabel = label;
        console.log('longpress' + profile.name);
        console.log('label ' + label.label);
    }

    updateSliderValue($event) {
        this.sliderValue = $event;
        console.log($event);
        console.log(this.slider.getValue());


        const matchingProfile = this.profiles.find(({profileId, labelId}) => profileId === this.test.id && labelId === this.testLabel.id);
        if (matchingProfile) {
            matchingProfile.value = this.sliderValue;
        } else {
            this.profiles.push({profileId: this.test.id, labelId: this.testLabel.id, value: this.sliderValue});
            // selected
        }
        // this.sliderValue = 0;
    }

    onSelected(event) {
        console.log(event.id);
        const test = document.getElementById(event.id);
        test.className += ' mat-button-toggle-checked';
        this.selected = event;
    }

    unSelected(event) {
        const unselected = document.getElementById(event.id);
        unselected.className = 'mat-button-toggle mat-button-toggle-appearance-standard ng-star-inserted';
        this.selected = event;
    }

    getUserEmail() {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.tokenService.getAccessToken());
        return decodedToken.sub;
    }
}


@Component({
    selector: 'dialog-slider-category',
    template: `
        <mat-slider
                vertical
                value="50"
        ></mat-slider>

    `,
    styles: ['::ng-deep.mat-dialog-container {\n' +
    '    padding: 0px !important;\n' +
    'overflow: hidden;}']

})
export class DialogSliderCategory implements OnInit {
    vertical = 'vertical';

    constructor(
        public dialogRef: MatDialogRef<DialogSliderCategory>
    ) {
    }

    validate() {
        this.dialogRef.close(true);
    }

    reset() {
        this.dialogRef.close(false);
    }

    openDialog() {
    }

    ngOnInit(): void {
    }
}


@Pipe({name: 'randomOrder'})
export class RandomOrderPipe implements PipeTransform {

    transform<T>(list: T[], seed: string): any {
        const seedrandom = require('seedrandom');
        const rng = seedrandom(seed);
        const shuffleArray: { value: T; random: number }[] = list.map((x) => ({value: x, random: rng()}));
        shuffleArray.sort((a, b) => a.random - b.random);
        return shuffleArray.map((x) => x.value);
    }
}
