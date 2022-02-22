import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription, timer } from 'rxjs';
import { FinderGenericDTO } from '../model/finderGenericDTO';
import { FinderParamsDTO } from '../model/finderParamsDTO';
import { FormdataReportdef } from '../model/formdata';
import { User } from '../model/user';
import { ReportdefService } from '../service/reportdef.service';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit, AfterViewInit {
  subtitle: string;
  user:User | undefined;
  data:any;
  dataVideo:any;
  videos:any;
  subscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  activeIndex = 0;
  everyFiveSeconds: Observable<number> = timer(0, 10000);
  everyTenMinutes: Observable<number> = timer(0, 600000);
  currentVideo:any;
  constructor(private reportdefService: ReportdefService, private sanitizer: DomSanitizer) {
    this.subtitle = 'This is some text within a card block.';
  }
  ngOnInit(): void {
    this.videos = [];
    //this.videos.push({id:1,src:'assets/video/video1.mp4',type:'video/mp4',name:'video1'});
    //this.videos.push({id:2,src:'assets/video/video2.mp4',type:'video/mp4',name:'video2'});
    //this.currentVideo = this.videos[this.activeIndex];

    
    
    this.reportdefService.login('mnsg','xmnsg')
    .subscribe(
      response => {
        this.user = response;
        this.consultarVideos(this.putDataFinder('devuelveVideos'));
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.subscription = this.everyFiveSeconds.subscribe(() => {
          console.log('traigo los datos turno cada 10 segundos');
          this.consultarTurnos(this.putDataFinder('devuelveTurnero'));
      },
      error => {
        console.log(error);
      });
    });

    this.subscription2 = this.everyTenMinutes.subscribe(() => {
      console.log('traigo videos cada 10 minutos');
      this.consultarVideos(this.putDataFinder('devuelveVideos'));
  },
  error => {
    console.log(error);
  });

  }
  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  consultarTurnos(finder:any){
    this.reportdefService.consultarAbmGeneric(this.user!,finder)
    .subscribe(
      response => {
        console.log('trajo el tabular');
        this.data = response.data;
      },
      error => {
        console.log(error);
      });                  

  }
  consultarVideos(finder:any){
    this.reportdefService.consultarAbmGeneric(this.user!,finder)
    .subscribe(
      response => {
        //console.log('trajo el tabular');
        

        if(response.data.length > 0 ){


          for (let i = 0; i < response.data.length; i++) {
            this.devuelveUrl(response.data[i][1].value);
          }
          if(this.currentVideo === undefined){
            this.startPlaylistVdo(0,this.videos[0]);
          }
        }


      },
      error => {
        console.log(error);
      });                  

  }
  devuelveUrl(src:any){
    const byteString = window.atob(src);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array]);   
    const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    this.videos.push(url);

  }
  putDataFinder(method: string){
    const finder = {} as FinderParamsDTO;
    //finder.methodName = 'devuelveTurnero';
    finder.methodName = method;
    finder.typeMethodFinder = true;
    const ger = {} as FinderGenericDTO;
      

    const listNew: FormdataReportdef[] = [];
    const param = {} as FormdataReportdef;
    param.valueNew = 362;  
    param.value = 362;
    param.name = 'p1';
    param.type = 'java.lang.Long';
    param.entity = false;
    param.entero = true;  
    listNew.push(param);
    ger.parametrosFinderMetodo = listNew;
    finder.finderGenericDTO = ger;
    return finder;
  }
  ngAfterViewInit() {}

  videoPlayerInit(data: any) {
    this.dataVideo = data;
    this.dataVideo.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.initVdo.bind(this));
    this.dataVideo.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videos.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videos[this.activeIndex];
  }
  initVdo() {
    this.dataVideo.play();
  }
  startPlaylistVdo(item: any, index: any) {
    this.activeIndex = item;
    this.currentVideo = index;
  }
}
