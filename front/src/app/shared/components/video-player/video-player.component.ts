import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TokenService} from '../../../core/services';
import {Audio} from '../../models';
import {AudioService} from '../../../core/http';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  @Input() audio: Audio; // modèle à remplacer plus tard
  @Output() started: EventEmitter<void> = new EventEmitter();
  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Output() ended: EventEmitter<void> = new EventEmitter();

  video: HTMLMediaElement;


  constructor(private tokenService: TokenService, private audioService: AudioService) {
    Object.assign({},  {
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
    this.video = document.querySelector('video');
    console.log(this.video.currentTime);
    this.video.onplay = () => {
      this.started.emit();
      console.log('VIDEO IS STARTED');
    };
    this.video.onloadedmetadata = (event) => {
      this.loaded.emit();
    };

    this.video.src = this.audioService.serveAudioEndPoint(this.audio.id, this.tokenService.getAccessToken());
    console.log('link : ' + this.video.src);
    // this.video.controls = false => Permet d'enlever la possibilité de controler le player
    this.video.controls = false;
    this.video.onended = () => {
      this.ended.emit();
    };
  }


  ngOnChanges(changes: SimpleChanges) {

  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  getTimeStamp() {
    return this.video.currentTime;
  }

  restart(){
    return this.video.currentTime = 0;
  }
}
