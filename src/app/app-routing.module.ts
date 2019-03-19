import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthorizationComponent} from "./authorization/authorization.component"
import {LessonsListComponent} from "./lessons-list/lessons-list.component";

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'auth', component: AuthorizationComponent},
    {path: 'lessons', component: LessonsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
