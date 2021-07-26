import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  bitacora(){
    this.router.navigate(['/dashboard/bitacora']);
  }

  residentes(){
    this.router.navigate(['/dashboard/residentes']);
  }

  eventos(){
    this.router.navigate(['/dashboard/eventos']);
  }
  empleados(){
    this.router.navigate(['/dashboard/empleados']);
  }

}
