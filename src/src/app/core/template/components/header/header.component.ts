import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm = '';
  constructor() { }

  ngOnInit() { this.initValue(); }

  // Método con evento de scroll-window para animación de menú secundario
  @HostListener('window:scroll', ['$event'])
  hiddenMenu($event: any) {
    const scrollOffset = $event.srcElement.children[0].scrollTop;
    const firstMenu = document.getElementsByClassName('nav-primary')[0];
    const secondMenu = document.getElementsByClassName('nav-secondary')[0];
    const itemFirstMenu = document.getElementsByClassName('nav-item-primary')[0];
    const searchNavbar = document.getElementsByClassName('search-navbar')[0];

    // Valida la posición del scroll para activar/inactivar animación
    if (scrollOffset < 300) { this.initValue(); } else {
      firstMenu.classList.remove('hidden-transition');
      secondMenu.classList.remove('show-transition');
      if (firstMenu.classList.contains('show-transition') === false) {
        firstMenu.classList.add('show-transition');
        itemFirstMenu.classList.remove('is-scroll');
      }
      if (secondMenu.classList.contains('hidden-transition') === false) {
        secondMenu.classList.add('hidden-transition');
      }
      if (searchNavbar.classList.contains('translation') === false) {
        searchNavbar.classList.add('translation');
        searchNavbar.classList.remove('non-translation');
      }
    }
  }

  // Header Nvl 1: Función para ocultar la sección de notificación
  hiddenNotification() {
    const notification: any = document.getElementsByClassName('navbar-notifications')[0];
    notification.style.display = 'none';
  }
  // Header Nvl 2: Función para activar la animación de búsqueda
  searchFocus() {
    const searchBar = document.getElementsByClassName('form-search-bar')[0];
    searchBar.classList.add('form-search-bar-active');
  }
  // Header Nvl 2: Función para ocultar la animación de búsqueda
  searchOutFocus() {
    const searchBar = document.getElementsByClassName('form-search-bar')[0];
    searchBar.classList.remove('form-search-bar-active');
  }
  // Header Nvl 2: Función para redireccionar búsqueda a gov.co
  searchGovCo() {
    document.location.href = 'https://www.gov.co/buscador?busqueda=' + this.searchTerm;
  }

  // Header Nvl 2: Función para implementar la funcionalidad de translate
  // TODO: Funcionalidad translate
  changeLang() {
    const langGovco = document.getElementsByClassName('lang-govco')[0];
    if (langGovco.classList.contains('govco-icon-language-es-n')) {
      langGovco.classList.add('govco-icon-language-en-n');
      langGovco.classList.remove('govco-icon-language-es-n');
    } else if (langGovco.classList.contains('govco-icon-language-en-n')) {
      langGovco.classList.add('govco-icon-language-es-n');
      langGovco.classList.remove('govco-icon-language-en-n');
    }
  }

  // Función para asignar valores iniciales a la animación de segundo menú
  private initValue() {
    const firstMenu = document.getElementsByClassName('nav-primary')[0];
    const secondMenu = document.getElementsByClassName('nav-secondary')[0];
    const itemFirstMenu = document.getElementsByClassName('nav-item-primary')[0];
    const searchNavbar = document.getElementsByClassName('search-navbar')[0];
    if (firstMenu.classList.contains('hidden-transition') === false) {
      itemFirstMenu.classList.add('is-scroll');
      firstMenu.classList.add('hidden-transition');
      firstMenu.classList.remove('show-transition');
    }
    if (secondMenu.classList.contains('show-transition') === false) {
      secondMenu.classList.remove('hidden-transition');
      secondMenu.classList.add('show-transition');
    }
    if (searchNavbar.classList.contains('translation')) {
      searchNavbar.classList.remove('translation');
      searchNavbar.classList.add('non-translation');
    }
  }
}
