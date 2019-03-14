import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {

  constructor(private http: HttpClient) {}

  listsUrl = 'http://localhost:3000/lists';
  tasksUrs = 'http://localhost:3000/tasks';

  // Lists
  getLists() {
    return this.http.get(this.listsUrl);
  }

  addList(listName) {
    return this.http.post(this.listsUrl, {
      name: listName
    });
  }

  deleteList(targetList) {
    return this.http.delete(this.listsUrl + `?id=${targetList}`);
  }

  // Tasks
  getTasksFromSelectedList(selectedListId) {
    return this.http.get(this.tasksUrs + `?listId=${selectedListId}`);
  }

  addTaskToselectedList(body) {
    return this.http.post(this.tasksUrs, {
      listId: body.listId,
      name: body.name,
      done: false,
    });
  }

  deleteTaskFromSelectedList(targetTaskId) {
    return this.http.delete(this.tasksUrs + `/${targetTaskId}`);
  }

  changeNameOfTask(targetTask) {
    return this.http.patch(this.tasksUrs + `/${targetTask.id}`, {
      name: targetTask.name
    });
  }

}
