import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban_angular';
  taskShowFlag = false;

  taskShow() {
    this.taskShowFlag = !this.taskShowFlag;
  }
}
