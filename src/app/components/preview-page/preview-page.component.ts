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
  ) { }

  lists;
  undoneTasks;

  ngOnInit() {
    this.getListsAndTasks();
  }

  getListsAndTasks() {

    this.todolistsService
      .getLists()
      .subscribe(res => {
        this.lists = res;
        this.sortListsByPinFirst();
        this.todolistsService
          .getUndoneTasksFromSelectedList()
          .subscribe(res => {
            this.undoneTasks = res;
            this.lists.forEach(list => {
              list.undoneTasks = this.undoneTasks.filter(task => task.listId === list.id);
              console.log('Undone tasks', this.lists);
            })
          });
      });
  }


  sortListsByPinFirst() {
    this.lists = this.lists.sort(this.pinnedFirstSorting);
  }

  pinnedFirstSorting(a, b) {
    if (a.pin < b.pin)
      return 1;
    if (a.pin > b.pin)
      return -1;
    return 0;
  }

  navigateToTodolist(event, listId) {
    let targetPinBtn = event.target.closest('span.pin__btn');
    let targetCard = event.target.closest('div.list__card');
    if (!targetPinBtn && targetCard) {
      return this.route.navigate([`/todolist/${listId}`]);
    }
  }

}
