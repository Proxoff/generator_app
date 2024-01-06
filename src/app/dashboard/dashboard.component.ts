import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  features = [
    {
      title: 'Мои истории',
      path: 'image-history',
      icon: 'fas fa-image'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
