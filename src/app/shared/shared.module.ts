import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DatatableComponent } from './components/datatable/datatable.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

const MODULES = [
  MatInputModule,
  MatButtonModule,
  ReactiveFormsModule,
  HttpClientModule,
  FlexLayoutModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES,
    DatatableComponent
  ]
})
export class SharedModule { }