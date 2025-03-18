import {Component, Input, OnInit} from '@angular/core';
import {Audio} from '../../models';
import {TokenService} from '../../../core/services';
import {AudioService} from '../../../core/http';

@Component({
  selector: 'app-simplevideo-player',
  templateUrl: './simplevideo-player.component.html',
  styleUrls: ['./simplevideo-player.component.css']
})
export class SimplevideoPlayerComponent implements OnInit {

  @Input() audio: Audio;

  video: any;

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
    this.video = document.getElementById('video2');
    this.video.src = this.audioService.serveAudioEndPoint(this.audio.id, this.tokenService.getAccessToken());
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

}
