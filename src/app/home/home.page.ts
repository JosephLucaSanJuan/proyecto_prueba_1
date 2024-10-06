import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SeriesService } from '../services/series.service';
import { Series } from '../model/series';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private seriesService: SeriesService,
    private alertController: AlertController
  ) {}
  
  public goEditPage(id:number|undefined) {
    return this.router.navigateByUrl(`/edit${id != undefined ? +id: ''}`)
  }

  public deleteShow(id:number) {
    return this.seriesService.deleterSeries(id)
  }

  async presentAlertConfirm(s:Series){
    console.log('alerta')
    const alert = await this.alertController.create({})
  }

}
