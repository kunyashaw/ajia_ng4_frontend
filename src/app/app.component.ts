import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['styles.css']
})
export class AppComponent { name = 'Angular'; }
