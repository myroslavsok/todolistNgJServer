import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { PreviewPageComponent } from './components/preview-page/preview-page.component';

const routes: Routes = [
  { path: '', component: PreviewPageComponent },
  { path: 'app', component: AppComponent },
  { path: '**', redirectTo: '/' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
