import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'// permite acceso global y no tener que especificarlo en los providers del modulo
})
export class GifsService {

  private apiKey: string = ''
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  //importo el httpClient para poder hacer peticiones
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase()

    if (query.trim().length === 0) { return }

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 12)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query)


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => { //equivalente al then
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

  }

}
