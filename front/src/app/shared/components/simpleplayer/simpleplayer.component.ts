import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Audio } from '../../models';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import { TokenService } from 'src/app/core/services';

@Component({
  selector: 'app-simpleplayer',
  templateUrl: './simpleplayer.component.html',
  styleUrls: ['./simpleplayer.component.css']
})
export class SimpleplayerComponent implements OnInit {

  @Input() audio: Audio;

  wave: WaveSurfer;

  defaultParams = {
    container: '#waveform2',
    waveColor: '#3f51b5',
    progressColor: 'blue',
    plugins: [
      TimelinePlugin.create({
        container: '#timeline2',
        pixelRatio: 2
      })
    ],
  };
  
  parametres

  constructor(private tokenService: TokenService) {
    this.parametres = Object.assign({}, this.defaultParams, {
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
    console.log("simple player")
    console.log(this.audio);
    this.wave = WaveSurfer.create(this.parametres);
    this.wave.load(this.audio.link);

  }


  play() { this.wave.play(); }

  pause() { this.wave.pause(); }

  stop() { this.wave.stop(); }

}
