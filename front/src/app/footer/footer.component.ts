import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  public imUsername = localStorage.getItem('username');
  @Input() authorized: boolean = false;
  ngOnInit() {
  }

}
