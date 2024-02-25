import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinderGenericDTO } from '../model/finderGenericDTO';
import { FinderParamsDTO } from '../model/finderParamsDTO';
import { FormdataReportdef } from '../model/formdata';
import { User } from '../model/user';
import { ReportdefService } from '../service/reportdef.service';
import { TurneroGlobalService } from '../service/turneroGlobalService';

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
  type='video/mp4';
  cargado = false;
  src:any;
  turnero:boolean;
  msg: string;
  widith:string;
  private turneroRef: Subscription = null;
  soloVideo: boolean;
  soloTurnos: boolean;

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private reportdefService: ReportdefService, private sanitizer: DomSanitizer,
    public tService:TurneroGlobalService,private toastr: ToastrService) {
    this.subtitle = 'This is some text within a card block.';
      this.soloVideo = false;
      this.widith = '600px';
  }




  getTurnosAndVideos(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const sTurno = JSON.parse(localStorage.getItem('soloTurno'));
    if(sTurno===false){


        if(currentUser !== undefined && currentUser.sla ===false){
          if(this.videoplayer!==undefined){
            this.videoplayer.nativeElement.widith='600px';
          }

          this.soloVideo = false;
          this.subscription = this.everyFiveSeconds.subscribe(() => {
            console.log('traigo los datos turno cada 10 segundos');
            this.consultarTurnos(this.putDataFinder('devuelveTurnero'));
          },
          error => {
          console.log(error);
          });
      }else{
        this.soloVideo = true;
        if(this.videoplayer!==undefined){
          this.videoplayer.nativeElement.widith='600px';
        }
      }


        this.subscription2 = this.everyTenMinutes.subscribe(() => {
          console.log('traigo videos cada 10 minutos');
          this.consultarVideos(this.putDataFinder('devuelveVideos'));
        },
          error => {
          console.log(error);
        });
      
  }else{
    this.soloTurnos=true;
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      console.log('traigo los datos turno cada 10 segundos');
      this.consultarTurnos(this.putDataFinder('devuelveTurnero'));
    },
    error => {
    console.log(error);
    });
}
} 
 


  ngOnInit(): void {
    this.videos = [];
    const current = localStorage.getItem('currentUser');
    if(current == undefined){
        this.turnero = false
    }else{
      this.user = JSON.parse(current);
      this.turnero = true;
      this.getTurnosAndVideos();
    }
    this.turneroRef = this.tService.turneroChanged$.subscribe(() => {
      this.turnero = this.tService.getTurne();
      this.subscription!.unsubscribe();
      this.subscription2!.unsubscribe();
  
    });

  }
  ngOnDestroy() {
    this.subscription!.unsubscribe();
    this.subscription2!.unsubscribe();
    this.turneroRef.unsubscribe();

  }

  consultarTurnos(finder:any){
    this.reportdefService.consultarAbmGeneric(this.user!,finder)
    .subscribe(
      response => {
        console.log('trajo los turnos');
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
        console.log('trajo los videos');
        

        if(response.data.length > 0 ){


          for (let i = 0; i < response.data.length; i++) {
            this.devuelveUrl(response.data[i][1].value);
          }
          this.cargado = true;
          if(this.videoplayer!==undefined){
            this.videoplayer.nativeElement.widith='600px';
          }
  
         // this.src = 'assets/video/video2.mp4'
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
  devuelveUrl2(src:any){
    this.videos.push(src);

  }


  putDataFinder(method: string){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const finder = {} as FinderParamsDTO;
    //finder.methodName = 'c';
    finder.methodName = method;
    finder.typeMethodFinder = true;
    const ger = {} as FinderGenericDTO;
      

    const listNew: FormdataReportdef[] = [];
    const param = {} as FormdataReportdef;
    param.valueNew = currentUser.gla||environment.gla;  
    param.value = currentUser.gla||environment.gla;
    param.name = 'p1';
    param.type = 'java.lang.Long';
    param.entity = false;
    param.entero = true;  
    listNew.push(param);
    ger.parametrosFinderMetodo = listNew;
    finder.finderGenericDTO = ger;
    return finder;
  }
  ngAfterViewInit() {
    
  }

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
    this.src = this.currentVideo;
    this.videoplayer.nativeElement.load();
    this.videoplayer.nativeElement.play();

  }
  initVdo() {
    this.dataVideo.play();
  }
  startPlaylistVdo(item: any, index: any) {
    this.activeIndex = item;
    this.currentVideo = index;
    this.src = index;
  }
}
