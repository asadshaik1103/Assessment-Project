
import { NgModule } from '@angular/core';
import { MatInputModule, MatTableModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        MatSelectModule
    ],
    exports: [
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        MatSelectModule
    ]
})
export class MaterialModule { }