import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {

  constructor(private http: HttpClient) {}

  listsUrl = 'http://localhost:3000/lists';
  tasks = 'http://localhost:3000/tasks';

  getLists() {
    return this.http.get(this.listsUrl);
  }

  getTasks() {
    return this.http.get(this.tasks);
  }

}
