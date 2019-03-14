import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() newList;
  @Input() selectedListId;
  @Output() OnGetSelectedListId = new EventEmitter<any>();
  @Output() OnDeleteList = new EventEmitter<any>();

  getSelectedListId() {
    this.OnGetSelectedListId.emit(this.newList);
  }

  deleteList() {
    this.OnDeleteList.emit(this.newList);
  }

}
