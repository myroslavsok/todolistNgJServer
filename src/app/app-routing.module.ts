import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PreviewPageComponent } from './components/preview-page/preview-page.component';
import { TodolistComponent } from './components/todolist/todolist.component';

const routes: Routes = [
  { path: '', redirectTo: '/preview', pathMatch: 'full' },
  { path: 'preview', component: PreviewPageComponent },
  { path: 'todolist/:id', component: TodolistComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: '**', redirectTo: '/' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
