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

  lists = [];

  ngOnInit() {
    this.getListsWithUndoneTasks();
  }

  getListsWithUndoneTasks() {
    this.todolistsService
      .getLists()
      .subscribe((lists: any) => {
        this.lists = lists.map(list => {
          list.tasks = list.tasks.filter(task => !task.done);
          return list;
        });
        this.sortListsByPinFirst();
        console.log("lists", this.lists);          
      });
  }  

  pinList(targetList) {
    this.sortListsByPinFirst();
    this.savePinnedStatusOfListToBd(targetList);
  }

  sortListsByPinFirst() {
    this.lists = this.lists.sort(this.pinnedFirstSorting);
  }

  savePinnedStatusOfListToBd(targetList) {
    this.todolistsService
      .pinList(targetList)
      .subscribe(res => console.log('onPin', res));
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
