import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProviderService } from './../shared/services/provider.service';
// import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  // public authorized = false;
  // @Input() authorized: boolean = true;
  // @Output() auth = new  EventEmitter<>();
  @Input() authorized: boolean;
  // @Input() authorized = true;
  // public authorized = true;
  @Output() output = new EventEmitter();
  

@Output() logging = new EventEmitter();

  public leftPage = false;
  public im = localStorage.getItem('username');
  ngOnInit() {
  }

  logout() {
    this.leftPage = confirm('Are you really want to exit?');
    if (this.leftPage) {
      this.provider.logout().then(res => {
        localStorage.clear();
        location.reload();
        console.log(window.location.pathname);
        this.authorized = false;
        this.output.emit(false);
        this.logging.emit(false);
        
        
        // this.output.emit('Message from header');
      });
    }
  }

  // sendMessage() {
  //   this.output.emit(false);
  // }
  login() {
    this.logging.emit(true);
  }

}
