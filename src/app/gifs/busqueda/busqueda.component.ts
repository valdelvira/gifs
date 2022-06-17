import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; // Para poder acceder a el elemento input del html
  // se puede usar txtBuscar!: ElementRef cuando estamos  completamente seguros de que siempre va a existir

  //accedemos al servicio inyectandolo en el constructor
  constructor(private gifsService: GifsService) { }


  buscar() {
    const texto = this.txtBuscar.nativeElement.value
    this.gifsService.buscarGifs(texto)
    this.txtBuscar.nativeElement.value = ''
  }
}
