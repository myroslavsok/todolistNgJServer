import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../../shared/services/todolists.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent implements OnInit {

  constructor(
    private todolistsService: TodolistsService,
    private route: Router
  ) {}

  lists;
  tasks;
  
  ngOnInit() {
    this.getListsAndTasks();
  }
  
  getListsAndTasks() {
    this.todolistsService
      .getLists()
      .subscribe(res => {
        this.lists = res;
        this.lists.map(list => {
          this.todolistsService
            .getTasksFromSelectedList(list.id)
            .subscribe(res => list.listTasks = this.sortListTasksForThreeUndone(res));
        });
      });
  }

  sortListTasksForThreeUndone(tasks) {
    tasks = tasks.filter(task => (task.done));
    if (tasks.length > 5) {
      tasks[5].name = '...';
      tasks.length = 6;
    }
    return tasks;
  }

  navigateToTodolist(listId) {
    this.route.navigate([`/todolist/${listId}`]);
  }

}
