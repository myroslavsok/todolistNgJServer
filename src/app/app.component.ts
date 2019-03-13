import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<any> = [
    {
      id: 1,
      listId: 1,
      name: 'Task 1 list 1'
    },
    {
      id: 2,
      listId: 2,
      name: 'Task 1 list 2'
    },
    {
      id: 3,
      listId: 3,
      name: 'Task 1 list 3'
    }
  ];
  lists: Array<any> = [
    {
      id: 1,
      name: 'List 1',
    },
    {
      id: 2,
      name: 'List 2'
    },
    {
      id: 3,
      name: 'List 3'
    }
  ];

  selectedList: any = this.tasks[0];

  addItemToTasks(task) {
    this.tasks.push(task);
  }

  addItemToLists(list) {
    this.lists.push(list);
  }

  selectList(list) {
    this.selectedList = list;
  }

  deleteList(listToDelete) {
    this.lists = this.lists.filter(list => list.id !== listToDelete.id);
  }

}
