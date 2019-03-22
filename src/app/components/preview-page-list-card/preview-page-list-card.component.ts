import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-page-list-card',
  templateUrl: './preview-page-list-card.component.html',
  styleUrls: ['./preview-page-list-card.component.scss']
})
export class PreviewPageListCardComponent implements OnInit {

  @Input() thisList;

  @Output() OnPinList = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.filterThisListForUndoneTasks();
  }
  
  filterThisListForUndoneTasks() {
    console.log("list-item", this.thisList);
    this.thisList.tasks = this.sortListTasksForFiveUndone(this.thisList.tasks);
  }

  sortListTasksForFiveUndone(tasks) {
    tasks = tasks.filter(task => !task.done);
    if (tasks.length > 5) {
      tasks[5].name = '...';
      tasks.length = 6;
    } else if (tasks.length === 0) {
      tasks = [{
        name: 'Everything is done.'
      }];
    }
    return tasks;
  }

  pinList() {
    this.thisList.pin = !this.thisList.pin;
    this.OnPinList.emit(this.thisList);
  }

}
