import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import { Audio } from '../../models';
import { TokenService } from 'src/app/core/services';
import {Video} from '../../models/video.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit, OnChanges {
  @Input() audio: Audio;
  @Output() paused: EventEmitter<void> = new EventEmitter();
  @Output() ended: EventEmitter<void> = new EventEmitter();
  @Output() started: EventEmitter<void> = new EventEmitter();



  wave: WaveSurfer;

  defaultParams = {
    container: '#waveform',
    waveColor: '#3f51b5',
    progressColor: 'blue',
    plugins: [
      TimelinePlugin.create({
        container: '#timeline',
        pixelRatio: 2
      })
    ],
  };

  params;

  constructor(private tokenService: TokenService) {
    this.params = Object.assign({}, this.defaultParams, {
      xhr: {
        cache: 'default',
        mode: 'cors',
        method: 'GET',
        redirect: 'follow',
        referrer: 'client',
        requestHeaders: [{ key: 'Authorization', value: 'Bearer ' + this.tokenService.getAccessToken() }]
      }
    });

  }

  ngOnInit(): void {

    this.wave = WaveSurfer.create(this.params);

    this.wave.on('finish', () => this.ended.emit());
    this.wave.on('pause', () => this.paused.emit());

    this.wave.on('play', () => this.started.emit());
    this.wave.load(this.audio.link);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.audio) {
      if (this.wave) {
        this.wave.load(this.audio.link);
      }
    }
  }

  play() { this.wave.play(); }

  pause() { this.wave.pause(); }

  stop() { this.wave.stop(); }

}
