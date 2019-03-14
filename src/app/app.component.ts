import { Component, OnInit } from '@angular/core';
import { TodolistsService } from './shared/services/todolists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private todolistsService: TodolistsService) {}

  // tasks: Array<any> = [
  //   {
  //     id: 1,
  //     listId: 1,
  //     name: 'Task 1 list 1',
  //     done: false
  //   },
  //   {
  //     id: 2,
  //     listId: 2,
  //     name: 'Task 1 list 2',
  //     done: false
  //   },
  //   {
  //     id: 3,
  //     listId: 3,
  //     name: 'Task 1 list 3',
  //     done: false
  //   }
  // ];
  // lists: Array<any> = [
  //   {
  //     id: 1,
  //     name: 'List 1',
  //   },
  //   {
  //     id: 2,
  //     name: 'List 2'
  //   },
  //   {
  //     id: 3,
  //     name: 'List 3'
  //   }
  // ];

  tasks;
  lists;

  // selectedList: any;
  selectedListId: any;

  ngOnInit() {
    this.todolistsService
      .getLists()
      .subscribe(resp => {
        console.log('resp', resp);
        this.lists = resp;
      });
  }

  addItemToTasks(taskName) {
    this.tasks.push({
      id: this.tasks.length + 1,
      listId: this.selectedListId,
      name: taskName,
      done: false
    });
  }

  addItemToLists(listName) {
    this.lists.push({
      id: this.lists.length + 1,
      name: listName
    });
  }

  tasksFromSelectedList() {
    return this.tasks.filter(task => task.listId === this.selectedListId);
  }

  selectList(list) {
    this.selectedListId = list.id;
  }

  deleteList(targetList) {
    this.lists = this.lists.filter(list => list.id !== targetList.id);
    this.tasks = this.tasks.filter(task => task.id !== targetList.id);
  }

  markTask(targetTask) {
    this.tasks.forEach(task => {
      if (task.id === targetTask.id) {
        task.done = targetTask.done;
      }
    });
  }

  changeTaskName(targetTask) {
    this.tasks.forEach(task => {
      if (task.id === targetTask.id) {
        task.name = targetTask.name;
      }
    });
  }

  deleteTask(taskId) {
    console.log(taskId);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

}
