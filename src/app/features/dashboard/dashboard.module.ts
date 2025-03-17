import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserdDetailsComponent } from '../userd-details/userd-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HighlightDirective } from '../../common/directives/highlight.directive';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [RouterModule]
})

export class DashboardModule { }
