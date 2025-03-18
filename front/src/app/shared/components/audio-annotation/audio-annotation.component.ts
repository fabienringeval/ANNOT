import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Audio, Emotion} from 'src/app/shared/models';
import {select, Store} from '@ngrx/store';
import {addingProfileAnnotations, reset, saved, State} from './store';
import {Observable, Subscription} from 'rxjs';
import {AudioService} from 'src/app/core/http/audio/audio.service';

@Component({
    selector: 'app-audio-annotation',
    templateUrl: './audio-annotation.component.html',
    styleUrls: ['./audio-annotation.component.css']
})
export class AudioAnnotationComponent implements OnInit, OnChanges, OnDestroy {
    @Input() audio: Audio;
    @Input() emotions: Emotion[] = [];
    @Input() campaignId: number;
    @Output() finished: EventEmitter<void> = new EventEmitter();

    subscriptions: Subscription[] = [];

    emptyProfileList = false;

    // Ready
    finished$: Observable<boolean>;

    // emotion list to annote
    toAnnotate: Emotion[] = [];
    actualStep: 'annotation' | 'summary' | 'profile' | 'save' = 'annotation';

    // current annotated emotion
    currentAnnotatedEmotion: Emotion = null;

    // annotations
    annotations: {
        emotionId: number,
        annotations: { timestamp: Date, value: number }[]
    }[] = [];


    // profiles
    profiles: { profileId: number, labelId: number, value: number }[] = [];

    // summaries
    summaries: {
        emotionId: number,
        value: number
    }[] = [];

    startTimer: Date;
    saveStart = false;

    commentaire = '';
    // emotionAnnotationDone && profilAnnotationDone

    buttonSave = 'Sauvegarder';
    buttonInP = 'Enregistrement en cours';

    AudioStore;

    constructor(
        private store: Store<State>,
        private audioService: AudioService
    ) {
        this.finished$ = this.store.pipe(select(saved));
        this.subscriptions.push(this.finished$.subscribe(finished => {
            if (finished) {
                this.finished.emit();
            }
        }));
        if (this.audio) {
            this.AudioStore = this.audio;
        }

    }

    ngOnInit(): void {

        this.toAnnotate = [...this.emotions];
        this.actualStep = 'annotation';

        if (this.emotions.length) {
            this.currentAnnotatedEmotion = this.emotions[0];
            this.startTimer = new Date();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.audio) {
            this.init();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });

        // reset store
        this.store.dispatch(reset());
    }

    timerDuration() {
        const stopTimer = new Date();
        const duration = ((stopTimer.getTime() - this.startTimer.getTime()) / 1000);
        return duration;
    }

    saveData() {
        console.log('SUMMARIES DATA: ', this.summaries);
        this.saveStart = true;
        const newsave = false;
        // if profile list not empty, save data
        if (this.profiles.length > 0) {
            this.store.dispatch(addingProfileAnnotations({audioId: this.audio.id, profiles: this.profiles}));
        }

        if (this.annotations.length > 0) {
            this.annotations.forEach(element => {
                this.audioService.nAddEmotionAnnotation(
                    this.audio.id,
                    element.emotionId,
                    element.annotations
                ).subscribe(messages => {
                    console.log(messages);
                    this.finished.emit();
                });
            });
        }

        if (this.summaries.length > 0) {
            this.summaries.forEach(e => {
                this.audioService.addEmotionSummary(
                    this.audio.id,
                    e.emotionId,
                    e.value
                ).subscribe(message => {
                    console.log(message);
                    this.finished.emit();
                });
            });

        }
        const timeAnnotation = this.timerDuration();
        // save extra
        const tosaveExtra = {
            duration: timeAnnotation,
            comment: this.commentaire
        };

        this.audioService.addComment(
            this.audio.id,
            tosaveExtra
        ).subscribe(messages => {
            console.log(messages);
            this.finished.emit();
        });
    }

    annotated(annotations) {
        this.annotations.push({
            emotionId: this.currentAnnotatedEmotion.id,
            annotations
        });
        console.log(this.annotations);
        // remove annotated
        console.log(this.toAnnotate);
        this.actualStep = 'summary';
    }

    profiled(profiles) {
        this.profiles = profiles;
        console.log(this.profiles);
        this.actualStep = 'save';
    }

    summarised(summaries) {
        this.summaries.push({
            emotionId: this.currentAnnotatedEmotion.id,
            value: summaries
        });

        this.actualStep = 'annotation';
        this.nextEmotion();
    }

    nextEmotion() {
        this.toAnnotate.splice(0, 1);
        this.currentAnnotatedEmotion = this.toAnnotate[0];

        if (!this.currentAnnotatedEmotion) {
            this.actualStep = 'profile';
        }
    }

    noProfile() {
        this.emptyProfileList = true;
    }

    readyToAnnotateEmotions(): boolean {
        return this.actualStep === 'annotation';
    }

    readyToProfile(): boolean {
        return this.actualStep === 'profile';
    }

    readyToSummary(): boolean {
        return this.actualStep === 'summary';
    }

    readyToSave() {
        return this.actualStep === 'save';
    }

    doSomething(event) {
        const commentaire = event.target.value;
        this.commentaire = commentaire;
    }

    init() {
        // reset results
        this.profiles = [];
        this.annotations = [];

        // init emotion list to annote
        this.toAnnotate = [...this.emotions];
        this.actualStep = 'annotation';

        // reset store
        this.store.dispatch(reset());

    }
}
