import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from './components/button/button.module';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SimplevideoPlayerComponent } from './components/simplevideo-player/simplevideo-player.component';
import { AudioAnnotationSummaryComponent } from './components/audio-annotation-summary/audio-annotation-summary.component';
import {SliderModule} from './components/slider/slider.module';
import {ButtonComponent} from './components/button/button.component';

@NgModule({
    imports: [CommonModule, SliderModule, ButtonModule],
    exports: [
        SharedModule.MODULE_LIST,
        VideoPlayerComponent,
        SimplevideoPlayerComponent,
        AudioAnnotationSummaryComponent,
        ButtonComponent
    ],
    declarations: [VideoPlayerComponent, SimplevideoPlayerComponent, AudioAnnotationSummaryComponent]
})

export class SharedModule {

    static readonly MODULE_LIST = [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatSnackBarModule,
        ButtonModule
    ];

}
