import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarMenu = [
    {
      name: 'Empleados',
      icon: 'supervised_user_circle',
      url: 'empleados',
      selectedUrl: this.checkActiveUrl('empleados'),
    },
    {
      name: 'Productos',
      icon: 'move_to_inbox',
      url: 'productos',
      selectedUrl: this.checkActiveUrl('productos'),
    },
    {
      name: 'Polizas',
      icon: 'note_add',
      url: 'polizas',
      selectedUrl: this.checkActiveUrl('polizas'),
    }
  ]

  public selectedUrl: {}

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  checkActiveUrl(route) {
    const url = this.router.url.substring(1, this.router.url.length)
    if (route == url) this.selectedUrl = { url: route }
    return route == url
  }

  togleSelectedUrl(item) {
    if (this.selectedUrl) {
      const tempIndex = this.sidebarMenu.findIndex((obj => obj.url === this.selectedUrl['url']))
      if (tempIndex != -1) {
        this.sidebarMenu[tempIndex].selectedUrl = false;
      }
    }
    localStorage.setItem('lastRouteUsed', ( item.url))
    item.selectedUrl = true
    this.selectedUrl = {...item}
  }
}
