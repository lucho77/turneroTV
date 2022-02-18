import { Component, AfterViewInit, OnInit } from '@angular/core';
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
  videos:any;
  subscription: Subscription | undefined;
  activeIndex = 0;
  everyFiveSeconds: Observable<number> = timer(0, 10000);
  currentVideo:any;
  constructor(private reportdefService: ReportdefService) {
    this.subtitle = 'This is some text within a card block.';
  }
  ngOnInit(): void {
    this.videos = [];
    this.videos.push({id:1,src:'assets/video/video1.mp4',type:'video/mp4',name:'video1'});
    this.videos.push({id:2,src:'assets/video/video2.mp4',type:'video/mp4',name:'video2'});
    this.currentVideo = this.videos[this.activeIndex];

    
    
    this.reportdefService.login('mnsg','xmnsg')
    .subscribe(
      response => {
        this.user = response;
        localStorage.setItem('currentUser', JSON.stringify(this.user));

        this.subscription = this.everyFiveSeconds.subscribe(() => {
          const finder = {} as FinderParamsDTO;
          finder.methodName = 'devuelveTurnero';
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
          this.reportdefService.consultarAbmGeneric(this.user!,finder)
          .subscribe(
            response => {
              console.log('trajo el tabular');
              this.data = response.data;
            },
            error => {
              console.log(error);
            });                  
 
      },
      error => {
        console.log(error);
      });
    });
  }
  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }
  ngAfterViewInit() {}

  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videos.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videos[this.activeIndex];
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
}
