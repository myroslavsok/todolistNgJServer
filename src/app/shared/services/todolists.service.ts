import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {

  constructor(private http: HttpClient) {}

  listsUrl = 'http://localhost:8080/lists';
  tasksUrs = 'http://localhost:8080/tasks';

  // Lists
  getLists() {
    return this.http.get(this.listsUrl);
  }

  addList(listName) {
    return this.http.post(this.listsUrl, {
      name: listName,
      pin: false
    });
  }

  deleteList(targetList) {
    return this.http.delete(this.listsUrl + `/${targetList.id}`);
  }

  pinList(targetList) {
    return this.http.patch(this.listsUrl + `/${targetList.id}`, {
      name: targetList.name,
      pin: targetList.pin
    });
  }

  // Tasks
  getTasksFromSelectedList(selectedListId) {
    return this.http.get(this.tasksUrs + `/list/${selectedListId}`);
  }

  getUndoneTasksFromSelectedList() {
    return this.http.get(this.tasksUrs + `/false`);
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


  changeTaskFields(targetTask) {
    console.log('change sevice', targetTask);
    return this.http.patch(this.tasksUrs + `/${targetTask.id}`, {
      name: targetTask.name,
      done: targetTask.done,
      listId: targetTask.listId
    });
  }

}
