import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @Input() dataSource;
  data: any[];
  @Input() title;
  @Input() withPaginate = true;
  @Input() actions: any[];
  @Output() paginateEvent = new EventEmitter<any>();
  @Output() eventAction = new EventEmitter<any>();
  displayedColumns: string[];
  pageEvent: PageEvent;

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dataSource.subscribe(val => {
      this.data = val;
      if(val['data']) {
        this.displayedColumns = Object.keys(val['data'][0]);
        this.displayedColumns.push('acciones');
      }
      this.table.renderRows();
    });
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page += 1;

    this.paginateEvent.emit({
      page,
      size
    });
  }

  eventButton(data, type) {
    this.eventAction.emit({
      data,
      type
    });
  }
}
