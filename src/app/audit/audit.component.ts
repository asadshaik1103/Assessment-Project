import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { AuditService, AuthenticationService } from '@/_services';
import { Audit } from '@/_models';

import { DatePipe } from '@angular/common';

@Component({ templateUrl: 'audit.component.html', styles: [
    'table { width: 100%; } .mat-form-field { font-size: 14px; width: 100%;} td, th { width: 25%;}'
] })
export class AuditComponent implements OnInit
{
    audits: MatTableDataSource<Audit>;
    currentUser = {
        firstName: ''
    };
    displayedColumns: string[] = ['id', 'ip', 'loginTime', 'logoutTime', 'user'];
    dateFormat: string = 'dd/MM/yyyy hh:mm:ss';
    hoursFormat = [ {
        hourFormat: '12 Hours',
        value: 'dd/MM/yyyy hh:mm:ss'
    }, {
        hourFormat: '24 Hours',
        value: 'dd/MM/yyyy HH:mm:ss'
    }];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService,
        private datePipe: DatePipe
    )
    {
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => {
                this.audits = new MatTableDataSource(audits);
                this.audits.paginator = this.paginator;
                this.audits.sort = this.sort;
            } );
    }

    filterAudits(filterValue: string) {
        this.audits.filterPredicate = (data, filter) => {
            return Object.keys(data).some(d => {
                if (d == 'loginTime' || d == 'logoutTime') {
                    let datePipeString = this.datePipe.transform(data[d], this.dateFormat);
                    return datePipeString.includes(filter);
                } else {
                    return data[d].toString().includes(filter);
                }
            })
        }
        this.audits.filter = filterValue.trim().toLowerCase();
    
        if (this.audits.paginator) {
          this.audits.paginator.firstPage();
        }
      }
}