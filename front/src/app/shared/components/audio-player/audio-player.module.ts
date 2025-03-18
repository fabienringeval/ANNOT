import { NgModule } from '@angular/core';
import { AudioPlayerComponent } from './audio-player.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [AudioPlayerComponent],
  exports: [AudioPlayerComponent],
  imports: [SharedModule]
})
export class AudioPlayerModule { }
