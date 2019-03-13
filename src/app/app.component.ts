import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<any> = [];
  lists: Array<any> = [];

  addItemToTasks(task) {
    this.tasks.push(task);
  }

  addItemToLists(list) {
    this.lists.push(list);
  }
}
