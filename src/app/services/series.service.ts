import { Injectable } from '@angular/core';
import { Series } from '../model/series';
import { filter } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  series: Series[] = []
  seriesCounter: number = 0

  constructor() {
    this.getSeriesFromPreferences().then(
      data => this.series = data
    )
  }

  public getSeries() {
    return this.series;
  }

  public async getSeriesFromPreferences(): Promise<Series[]>{
    const ret = await Preferences.get({ key: 'series' })
    if (ret.value != null) {
      return JSON.parse(ret.value) ? JSON.parse(ret.value):[]
    } else {
      return []
    }
  }

  public getSeriesById(id:number): Series{
    return {... this.series.filter(s=> s.id === id)[0] }
  }

  public saveSeries(s:Series): Promise<void>{
    return new Promise<void>(async (resolve, reject) => {
      if (s.id == undefined) {
        s.id = this.series[this.series.length-1].id! +1
        this.series.push(s)
      } else {
        let index = this.series.findIndex(show => show.id == s.id)
        if (index >= 0) {
          this.series[index]=s
        }
      }
    })
  }

  public deleterSeries(id:number) {
    this.series = this.series.filter(s => s.id != id)
    return this.saveShows(this.series)
  }

  public saveShows(series: Series[]): Promise<void> {
    return Preferences.set({
      key: 'series',
      value: JSON.stringify(series)
    });
  }
}
