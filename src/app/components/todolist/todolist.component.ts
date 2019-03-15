import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../../shared/services/todolists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  constructor(
    private todolistsService: TodolistsService,
    private route: ActivatedRoute
  ) {}

  tasks;
  lists;
  selectedListId: any;

  ngOnInit() {
    this.getSelectedListId();
    this.getLists();
    this.getTasksFromSelectedList();
  }

  getSelectedListId() {
    this.selectedListId = +this.route.snapshot.paramMap.get('id');
  }
  
  getLists() {
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
  // tasksFromSelectedList() {
  //   return this.tasks.filter(task => task.listId === this.selectedListId);
  // }

  getTasksFromSelectedList() {
    this.todolistsService
      .getTasksFromSelectedList(this.selectedListId)
      .subscribe(resp => {
        console.log('tasks resp', resp);
        this.tasks = resp;
      });
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
        this.lists = this.lists.filter(list => list.id !== targetList.id);
        this.tasks = this.tasks.filter(task => task.listId !== targetList.id);
      });
  }

  markTask(targetTask) {
    this.todolistsService
      .markTask(targetTask)
      .subscribe(resp => {
        this.tasks.forEach(task => {
          if (task.id === targetTask.id) {
            task.done = targetTask.done;
          }
        });
      });
  }

  changeTaskName(targetTask) {
    this.todolistsService
      .changeNameOfTask(targetTask)
      .subscribe(resp => {
        this.tasks.forEach(task => {
          if (task.id === targetTask.id) {
            task.name = targetTask.name;
          }
        });
      });
  }

  deleteTask(targetTaskId) {
    this.todolistsService
      .deleteTaskFromSelectedList(targetTaskId)
      .subscribe(resp => console.log(resp));
      this.tasks = this.tasks.filter(task => task.id !== targetTaskId);
  }

}
