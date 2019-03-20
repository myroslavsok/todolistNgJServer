import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() newTask;
  @Output() OnMarkTaskAsDone = new EventEmitter<any>();
  @Output() OnEditTask = new EventEmitter<any>();
  @Output() OnDeleteTask = new EventEmitter<any>();

  markTaskAsDone() {
    this.newTask.done = !this.newTask.done;
    this.OnMarkTaskAsDone.emit(this.newTask);
  }

  editTask() {
    const newName = prompt('Enter new name', this.newTask.name);
    if (!newName || newName === this.newTask.name) {
      return;
    }
    this.newTask.name = newName;
    this.OnEditTask.emit(this.newTask);
  }

  deleteTask() {
    this.OnDeleteTask.emit(this.newTask.id);
  }

}
