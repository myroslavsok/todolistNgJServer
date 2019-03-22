import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preview-page-list-card',
  templateUrl: './preview-page-list-card.component.html',
  styleUrls: ['./preview-page-list-card.component.scss']
})
export class PreviewPageListCardComponent implements OnInit {
  
  // private _asynDataThisList = new BehaviorSubject<any>([]);
  // @Input()
  // set thisList(value) {
  //     this._asynDataThisList.next(value);
  // };
  // get thisList() {
  //     return this._asynDataThisList.getValue();
  // }

  @Input() thisList;

  @Output() OnPinList = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.filterThisListForUndoneTasks();
  }
  
  filterThisListForUndoneTasks() {
    console.log("list-item", this.thisList);
    this.thisList.tasks = this.sortListTasksForFiveUndone(this.thisList.tasks);
    

    // this._asynDataThisList
    //   .subscribe(list => {
    //     console.log("list-item", list);
    //     // let tasks = list.undoneTasks;
    //     // this.thisList.undoneTasks = this.sortListTasksForFiveUndone(tasks);
    //   });
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
