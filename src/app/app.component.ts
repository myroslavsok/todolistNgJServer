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
    const queryBody = {
      listId: this.selectedListId,
      name: taskName
    }
    this.todolistsService
      .addTaskToselectedList(queryBody)
      .subscribe(resp => {
        this.tasks.push(resp);
      });
  }

  addItemToLists(listName) {
    this.todolistsService
      .addList(listName)
      .subscribe(resp => {
        console.log('add list resp', resp);
        this.lists.push(resp);
      });
  }

  // To delete
  tasksFromSelectedList() {
    return this.tasks.filter(task => task.listId === this.selectedListId);
  }

  selectList(list) {
    this.selectedListId = list.id;
    this.todolistsService
      .getTasksFromSelectedList(this.selectedListId)
      .subscribe(resp => {
        console.log('tasks resp', resp);
        this.tasks = resp;
      });
  }

  deleteList(targetList) {
    this.todolistsService
      .deleteList(targetList)
      .subscribe(resp => {
        console.log('delete list resp', resp);
        this.lists = this.lists.filter(list => list.id !== targetList.id);
        this.tasks = this.tasks.filter(task => task.id !== targetList.id);
      });

    // this.lists = this.lists.filter(list => list.id !== targetList.id);
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

  deleteTask(targetTaskId) {
    this.todolistsService
      .deleteTaskFromSelectedList(targetTaskId)
      .subscribe(resp => console.log(resp));
      this.tasks = this.tasks.filter(task => task.id !== targetTaskId);
  }

}
