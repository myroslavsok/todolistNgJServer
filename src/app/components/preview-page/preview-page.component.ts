import { Component, OnInit } from '@angular/core';
import { TodolistsService } from '../../shared/services/todolists.service';

import { Router } from '@angular/router';
import { resolve, reject } from 'q';


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
  tasks = [];
  
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
          .subscribe(res => { 
            list.listTasks = this.sortListTasksForThreeUndone(res);
            // this.filterListWithNoTasks();
          });
        })
        .forEach(item => console.log('item', item));
        console.log(this.lists);
      });
    
  }
  
  sortListTasksForThreeUndone(tasks) {
    const listId = tasks[0].id;
    tasks = tasks.filter(task => !task.done);
    if (tasks.length > 5) {
      tasks[5].name = '...';
      tasks.length = 6;
      // return tasks;
    } else if (tasks.length === 0) {
      tasks = [{
        name: 'Everything is done.'
      }];
    }
    return tasks; 
  }

  filterListWithNoTasks() {
    this.lists.forEach(list => console.log('list', list.listTasks));
  }

  navigateToTodolist(listId) {
    this.route.navigate([`/todolist/${listId}`]);
  }

}
