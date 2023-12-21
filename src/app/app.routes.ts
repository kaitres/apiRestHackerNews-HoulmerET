import { Routes } from '@angular/router';
import {TopComponent} from './story/top/top.component';
import {StoryComponent} from './story/story/story.component';
import {NotFoundComponent} from './story/not-found/not-found.component'

export const routes: Routes = [
    {path: '', redirectTo: 'top', pathMatch: 'full'},
    {path:'top', component:TopComponent},
    {path:'story/:id', component:StoryComponent},
    {path:'404', component:NotFoundComponent},
    {path:'**', redirectTo: '404', pathMatch: 'full'}
];
