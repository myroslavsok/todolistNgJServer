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
    this.OnMarkTaskAsDone.emit({
      id: this.newTask.id,
      done: !this.newTask.done
    });
  }

  editTask() {
    const newName = prompt('Enter new name', '');
    if (!newName || newName == null) {
      return;
    }
    this.OnEditTask.emit({
      id: this.newTask.id,
      name: newName
    });
  }

  deleteTask() {
    this.OnDeleteTask.emit(this.newTask.id);
  }

}
