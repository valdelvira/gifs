import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial
  }

  onSearch(termino: string) {
    console.log(termino);

    console.log(this.gifsService.buscarGifs(termino))
    this.gifsService.buscarGifs(termino)
  }
}
