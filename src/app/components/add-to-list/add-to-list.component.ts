import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent {

  @Output() OnAddToList = new EventEmitter<any>();
  @Input() selectedList;
  @Input() btnName;

  addToList(addField) {
    this.OnAddToList.emit(addField.value.add_field);
    addField.reset();
  }

}
