import {Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter, Inject, NgModule} from '@angular/core';
import {SliderConfiguration, TimeInterval, Audio, Emotion} from '../../models';
import {AudioPlayerComponent} from 'src/app/shared/components/audio-player/audio-player.component';
import {SliderComponent} from '../slider/slider.component';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Store, select} from '@ngrx/store';
import {
    State,
    getSliderConfiguration,
    getTimeInterval,
    loadingEmotionalAnalysisSliderConfiguration,
    loadingEmotionalAnalysisTimeInterval,
    reset
} from './store';
import {Observable, Subscription} from 'rxjs';
import {Video} from '../../models/video.model';
import {VideoPlayerComponent} from '../video-player/video-player.component';

@Component({
    selector: 'app-emotion-annotator',
    templateUrl: './emotion-annotator.component.html',
    styleUrls: ['./emotion-annotator.component.css']
})

export class EmotionAnnotatorComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];

    @Input() campaignId: number;
    @Input() audio: Audio;
    @Input() currentEmotion;
    @Output() annotated: EventEmitter<{ timestamp: number, value: number }[]> = new EventEmitter();

    @Input() video: Video;

    @ViewChild(AudioPlayerComponent) audioPlayer;
    @ViewChild(SliderComponent) slider;

    @ViewChild(VideoPlayerComponent) videoPlayer;

    videoLoaded: boolean = false;

    audioFinished = false;
    audioInProgress = false;

    videoFinished = false;
    videoInProgress = false;

    sliderConfig$: Observable<SliderConfiguration>;
    timeInterval$: Observable<TimeInterval>;

    sliderValue: number;
    sliderInitValue: number;
    timeInterval: number;

    annotations: { timestamp: number, value: number }[] = [];

    loop;
    count = 0;
    clear;
    counter = 0;

    showGraph = false;

    // Player buttons
    playButtonType = 'fab';
    playButtonIcon = 'play_arrow';
    pauseButtonIcon = 'pause_arrow';
    playButtonColor = 'primary';

    stopButtonType = 'fab';
    stopButtonIcon = 'replay';
    stopButtonColor = 'warn';

    actionInfo = {inProress: false, finished: false, reload: false};

    emotionToImg: string = null;

    constructor(
        private dialog: MatDialog,
        private store: Store<State>
    ) {
        this.sliderConfig$ = this.store.pipe(select(getSliderConfiguration));
        this.sliderConfig$.subscribe(sliderConfig => {
            if (sliderConfig) {
                this.sliderValue = this.sliderInitValue = sliderConfig.startValue;
            }
        });

        this.timeInterval$ = this.store.pipe(select(getTimeInterval));
        this.timeInterval$.subscribe(timeInterval => {
            if (timeInterval) {
                this.timeInterval = timeInterval.value;
            }
        });
        console.log('audio');
        console.log(this.audio);

        console.log(this.video);
    }

    ngOnInit(): void {
        this.store.dispatch(loadingEmotionalAnalysisSliderConfiguration({campaignId: this.campaignId}));
        this.store.dispatch(loadingEmotionalAnalysisTimeInterval({campaignId: this.campaignId}));
        if (this.currentEmotion !== null) {
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


    ngOnDestroy(): void {
        clearInterval(this.loop);
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.store.dispatch(reset());
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogValidAnnotation, {data: {annotations: this.annotations}});

        dialogRef.afterClosed().subscribe(validated => {
            if (validated) {
                this.annotated.emit(this.annotations);
            }
            this.reset();
        });
    }

    startAnnotation() {
        //this.videoInProgress = true;
        // si pause alors i += 0
        console.log('Heure timer ' + Date.now());

        // let i = 0;
        // this.counter = 0;
    }


    Counter() {
        this.clear = setInterval(() => {
            const timeDelay = this.counter * this.timeInterval;
            this.counter += 1;
            const value = {timestamp: timeDelay, value: this.sliderValue};
            this.annotations.push(value);
        }, this.timeInterval);
    }

    StopCounter() {
        this.counter += 0;
        clearInterval(this.clear);
    }

    updateSliderValue($event) {
        this.sliderValue = $event;
        this.getTimeStamp();
        this.getValue();
        console.log('dimension ' + this.emotionToImg);

    }

    stopAnnotation() {
        clearInterval(this.loop);
    }

    reset() {
        this.sliderValue = this.sliderInitValue;
        this.annotations = [];
        this.audioFinished = true;
        this.slider.reset();
    }

    annotate() {
        this.slider.lockCursor();
        this.startAnnotation();
        // this.Counter(); bouton pause
        // this.playAudio();

        this.video = this.audio;
        console.log(this.audio);
        console.log(this.video);

        console.log(this.audioPlayer);
        console.log(this.videoPlayer);


        this.playVideo();

    }

    /*
      audioEnded() {
        this.audioInProgress = false;
        this.stopAnnotation();
        this.slider.unlockCursor();
        this.audioFinished = true;
        this.openDialog();
      }

      audioStarted() {
        this.audioInProgress = true;
      }



      // manipulate Audio player

      playAudio() { this.audioPlayer.play(); }

      pauseAudio() {
        this.audioPlayer.pause(); }

      stopAudio() {
        this.audioPlayer.stop();
        this.audioInProgress = false;
      }*/


    // manipulate videoPlayer

    playVideo() {
        this.videoInProgress = true;
        console.log(this.videoInProgress);
        console.log('Heure vidéo ' + Date.now());
        this.videoPlayer.play();
    }

    pauseVideo() {
        this.videoInProgress = false;
        // this.StopCounter();
        this.videoPlayer.pause();
    }

    videoStarted() {
        this.videoInProgress = true;
        this.loop = setInterval(() => {
            const timeDelay = this.counter * this.timeInterval;
            console.log(timeDelay);
            this.counter += 1;
            if (this.videoInProgress === false) {
                // const remaining = this.counter;
                // this.counter = 0;
                clearInterval(this.loop);
            }
            const value = {timestamp: timeDelay, value: this.sliderValue};
            this.annotations.push(value);
            console.log(this.annotations);
        }, this.timeInterval);

    }

    videoisLoaded() {
        this.videoLoaded = true;
    }

    restart() {
        this.videoPlayer.restart();
    }

    videoEnded() {
        this.counter = 0;
        this.videoInProgress = false;
        this.stopAnnotation();
        this.slider.unlockCursor();
        this.videoFinished = true;
        this.openDialog();
        this.videoPlayer.restart();
    }

    getTimeStamp() {
        console.log('TimeStamp : ' + this.videoPlayer.getTimeStamp());
    }

    getValue() {
        console.log('Value : ' + this.slider.getValue());
    }

}


@Component({
    selector: 'dialog-valid-annotation',
    template: `
        <div>
            <h2>Etes-vous sur de valider cette annotation ?</h2>
            <app-emotion-graph [annotations]="data.annotations"></app-emotion-graph>
            <div style="width:100%; text-align:center; margin-top:10px">
                <div class="row">
                    <div class="col-md-6">
                        <app-button
                                [value]="resetButtonLabel"
                                [color]="resetButtonColor"
                                [icon]="resetButtonIcon" (clicked)="reset()">Restart
                        </app-button>
                    </div>
                    <div class="col-md-6">
                        <app-button
                                [value]="validButtonLabel"
                                [color]="validButtonColor"
                                [icon]="validButtonIcon" (clicked)="validate()">Validate
                        </app-button>
                    </div>
                </div>
            </div>
        </div>`
})
export class DialogValidAnnotation {
    // Player buttons
    validButtonLabel = 'Valider';
    validButtonIcon = 'done';
    validButtonColor = 'primary';

    resetButtonLabel = 'Recommencer';
    resetButtonIcon = 'replay';
    resetButtonColor = 'warn';

    constructor(
        public dialogRef: MatDialogRef<DialogValidAnnotation>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    validate() {
        this.dialogRef.close(true);
    }

    reset() {
        this.dialogRef.close(false);
    }
}

