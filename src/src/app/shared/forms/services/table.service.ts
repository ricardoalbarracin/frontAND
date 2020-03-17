import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../directives/sortable.directive';
import {TableSearchResultModel, TableStateModel, TableCellModel, TableConfigModel} from '../models/table.model';
import { filter } from 'minimatch';
import { isNumber } from 'util';

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(countries: TableCellModel[],  column: string, direction: string, configData?: TableConfigModel[]): TableCellModel[] {
  if (direction === '' || configData === undefined || configData.length <= 0) {
    return countries;
  } else if (countries === undefined) {
    return [];
  } else {
    const indexHeader = configData.findIndex(p => p.columnName === column);
    const newOrder  = [...countries].sort((a, b) => {
      const contentA = a[indexHeader].content;
      const contentB = b[indexHeader].content;
      const res = compare(contentA, contentB);
      return direction === 'asc' ? res : -res;
    });

    return newOrder;
  }
}

function matches(country: any, term: string, pipe: PipeTransform) {
  const arrTable = [];

  // Caso: Selección de opción TODO
  if (term.toLocaleLowerCase() === 'todo') { return country; }

  // Itera fila a fila
  for (const iterator of country) {
    let arrRow = [];

    // Itera columna de fila
    for (const data of iterator) {
      const element = data.content;

      if (term.length <= 0) {
        arrRow.push(data);
      } else if (element !== undefined ) {

        // if (isNumber(element) && pipe.transform(element).includes(term)) {  // Caso: Número
        //   arrRow = iterator;
        //   break;
        // } else if (element.length > 0 && element.toLowerCase().includes(term.toLowerCase())) {  // Caso: Texto
        //   arrRow = iterator;
        //   break;
        // }

        if ((isNumber(element) && pipe.transform(element).includes(term)) || (element.length > 0 && element.toLowerCase().includes(term.toLowerCase()))) {  
          arrRow = iterator;
          break;
        }
      }
    }
    if (Object.keys(arrRow).length) { arrTable.push(arrRow); }
  }
  return arrTable;
}

function filterDateRange(country: any, configDateRange: any, configData: TableConfigModel[], column: string) {
  const arrTable = [];
  for (const iterator of country) {
    const indexHeader = configData.findIndex(p => p.columnName === column);
    const dateCell = iterator[indexHeader].content;
    if (dateCell >= configDateRange.from && dateCell <= configDateRange.to) {
      arrTable.push(iterator);
    }
  }
  return arrTable;
}

@Injectable({providedIn: 'root'})
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<TableCellModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private data: TableCellModel[];
  private dataConfig?: TableConfigModel[];
  private filterData: any[];
  private _state: TableStateModel = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    filterTerm: '',
    sortColumn: '',
    sortDirection: '',
    indexColumn: 0,
    dateRange: {
      isRange: false,
      from: null,
      to: null
    }
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.content);
      this._total$.next(result.total);
    });
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get filterTerm() { return this._state.filterTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set filterTerm(filterTerm: string) { this._set({filterTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private clearState() {
    this._state = {
      page: 1,
      pageSize: this._state.pageSize,
      searchTerm: '',
      filterTerm: '',
      sortColumn: '',
      sortDirection: '',
      indexColumn: 0,
      dateRange: {
        isRange: false,
        from: null,
        to: null
      }
    };
  }
  public setCountries(data: TableCellModel[], config?: TableConfigModel[], lenHeader: number = 0) {
    this.filterData = new Array(lenHeader);
    this.data = data;
    this.dataConfig = config;
    this._countries$.next(data);
    this._search$.next();
  }
  public sortContent(sortColumn: string, sortDirection: SortDirection) {
    this._set({sortColumn});
    this._set({sortDirection});
  }
  public filterRange(dateRange, sortColumn, sortDirection) {
    this.clearState();
    this._set({dateRange, sortDirection, sortColumn});
  }
  public filterContent(filterTerm: string, indexColumn: number) {
    this.clearState();
    this._set({indexColumn, filterTerm});
  }

  private _set(patch: Partial<TableStateModel>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<TableSearchResultModel> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm, filterTerm, dateRange} = this._state;
    let total = 0;
    // 1. sort
    let content = sort(this.data, sortColumn, sortDirection, this.dataConfig);

    // 2. filter
    const term = searchTerm !== undefined && searchTerm.length > 0 ? searchTerm : filterTerm;
    if (dateRange.isRange === false) { content =  matches(content, term, this.pipe); }
    else if (dateRange.isRange === true) { content = filterDateRange(content, dateRange, this.dataConfig, sortColumn); }

    // 3. paginate
    total = content.length;
    content = content.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    const body = {content, total};
    return of(body);
  }
}
