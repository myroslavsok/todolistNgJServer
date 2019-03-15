import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

// Services
import { TodolistsService } from './shared/services/todolists.service';
import { PreviewPageComponent } from './components/preview-page/preview-page.component';
import { TodolistComponent } from './components/todolist/todolist.component';

@NgModule({
  declarations: [
    AppComponent,
    AddToListComponent,
    ListComponent,
    ListItemComponent,
    TaskItemComponent,
    PreviewPageComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [TodolistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
