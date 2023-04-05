import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    private ApiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.ApiService.logoutUser();
    this.router.navigateByUrl('/login')
  }
}
