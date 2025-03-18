import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    ViewChild,
    ElementRef,
    Renderer2,
    OnDestroy,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {Emotion} from '../../models';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() min: number;
    @Input() max: number;
    @Input() step: number;
    @Input() initValue: number;
    @Input() emotionToImg: string = null;
    @Input() vertical: string;
    @Input() isSummary: boolean;
    @Output() sliderChange: EventEmitter<number> = new EventEmitter();
    @Output() unlocked: EventEmitter<void> = new EventEmitter();

    cursor;
    value: number;
    sliderWidth: number;
    initPosition: string;

    position: number;
    nameInfoEmotion: string = null;
    sliderImg: string = null;

    @ViewChild('slider', {read: ElementRef, static: false}) slider: ElementRef;
    @ViewChild('graduation', {read: ElementRef, static: false}) graduation: ElementRef;
    @ViewChild('graduationInitPosition', {read: ElementRef, static: false}) graduationInitPosition: ElementRef;

    private unlistenMouseMove: () => void;
    private unlistenCursorClick: () => void;
    private unlistenLockChange: (() => void)[] = [];

    constructor(
        private renderer: Renderer2,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        console.log(this.emotionToImg);
        this.position = this.value = this.initValue;
        if (this.emotionToImg !== null) {
            this.nameInfoEmotion = this.emotionToImg;
            if (this.emotionToImg === 'Agrément intrinsèque') {
                this.sliderImg = 'Valence';
            } else if (this.emotionToImg === 'Éveil') {
                this.sliderImg = 'Arousal';
            } else if (this.emotionToImg === 'Maîtrise') {
                this.sliderImg = 'Coping';
            } else if (this.emotionToImg === 'Conductivité') {
                this.sliderImg = 'Conduciveness';
            } else if (this.emotionToImg === 'Nouveauté') {
                this.sliderImg = 'Novelty';
            }
        }
    }

    ngOnChanges() {
        if (this.emotionToImg !== null) {
            this.nameInfoEmotion = this.emotionToImg;
            if (this.emotionToImg === 'Valence') {
                this.sliderImg = 'Valence';
            } else if (this.emotionToImg === 'Arousal') {
                this.sliderImg = 'Arousal';
            } else if (this.emotionToImg === 'Coping') {
                this.sliderImg = 'Coping';
            } else if (this.emotionToImg === 'Conduciveness') {
                this.sliderImg = 'Conduciveness';
            } else if (this.emotionToImg === 'Novelty') {
                this.sliderImg = 'Novelty';
            } else if (this.emotionToImg === 'Pleasantness') {
                this.sliderImg = 'Pleasantness';
            }
        }
    }

    reset() {
        this.position = this.value = this.initValue;
    }

    sliderOnChange({value}) {
        this.sliderChange.emit(value);
    }

    ngAfterViewInit() {
        const slider = this.slider.nativeElement;
        this.sliderWidth = slider.clientWidth;

        const graduation = this.graduation.nativeElement;
        const graduationInitPosition = this.graduation.nativeElement.children[0];

        this.initPosition = ((graduation.clientWidth / (this.max - this.min)) * Math.abs(this.initValue - this.min) + graduationInitPosition.clientWidth / 2) + 'px';

        this.cursor = slider.getElementsByClassName('mat-slider-thumb-label')[0];


        ['pointerlockchange', 'mozpointerlockchange', 'webkitpointerlockchange'].forEach(event => {
            this.unlistenLockChange.push(this.renderer.listen('document', event, () => this.lockChangeAlert()));
        });

        ['pointerlockerror', 'mozpointerlockerror', 'webkitpointerlockerror'].forEach(event => {
            this.unlistenLockChange.push(this.renderer.listen('document', event, () => this.lockChangeAlert()));
        });

        this.unlistenCursorClick = this.renderer.listen(this.cursor, 'click', () => this.lockCursor());

        this.cd.detectChanges();
    }

    lockError(e) {
        alert('Pointer lock failed');
    }

    lockCursor() {
        if (!this.isSummary) {
            // check if unlocked before trying to lock it
            if (!document.pointerLockElement) {
                this.cursor.requestPointerLock = this.cursor.requestPointerLock ||
                    this.cursor.mozRequestPointerLock ||
                    this.cursor.webkitRequestPointerLock;
                this.cursor.requestPointerLock();
            }
        }
    }

    unlockCursor() {
        // check if locked before trying to unlock it
        if (!!document.pointerLockElement) {
            document.exitPointerLock = document.exitPointerLock ||
                document['mozExitPointerLock'] ||
                document['webkitExitPointerLock'];

            document.exitPointerLock();
        }
    }

    lockChangeAlert() {
        if (document.pointerLockElement === this.cursor) {
            this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
                this.updateSliderPosition(e);
                console.log('restart');
            });
        } else {
            this.unlocked.emit();
            this.unlistenMouseMove();
            this.reset();
            console.log('pause');
        }
    }

    updateSliderPosition(e: MouseEvent) {
        let x = 0;

        // console.log(this.slider.nativeElement.vertical);
        if (this.vertical === undefined) {
            x = this.position + e.movementX * ((this.max - this.min) / this.sliderWidth) ;
        } else {
            x = this.position + e.movementY * ((this.min - this.max) / this.sliderWidth) / 10;
        }

        if (x > this.max) {
            x = this.max;
        }

        if (x < this.min) {
            x = this.min;
        }

        this.position = x;

        // calcul de la valeur en prenant en compte le step.
        this.value = Math.trunc(this.position / this.step) * this.step;
        this.sliderChange.emit(this.value);
    }


    ngOnDestroy() {
        if (this.unlistenCursorClick) {
            this.unlistenCursorClick();
        }

        if (this.unlistenMouseMove) {
            this.unlistenMouseMove();
        }

        this.unlistenLockChange.forEach(unlisten => unlisten());
    }

    getValue() {
        return this.value;
    }
}
