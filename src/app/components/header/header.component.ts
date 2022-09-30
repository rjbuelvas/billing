import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() params: string = '';
  @Input() urlAvatar: string = '';
  @Output() logout = new EventEmitter();
  @Output() searchInit = new EventEmitter();

  avatar = false;
  constructor() { }

  ngOnInit() {
    if(this.params !== ''){
      this.avatar = true;
    }
  }
  logoutClick() {
    this.logout.emit(true);
  }

  search( event ) {
    this.searchInit.emit(event.detail.value);
  }
}
