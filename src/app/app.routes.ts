import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { CodeComponent } from './code/code.component';



const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'edit', component: EditComponent },
    { path: 'code', component: CodeComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

