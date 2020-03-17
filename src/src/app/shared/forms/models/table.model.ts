import { SortDirection } from '../types/SortType';

// Modelo de la estructura de tablas
export interface GovcoTableModel {
    Header: TableHeaderModel [];
    Body?: any [];
    ConfigHeader?: TableConfigModel [];
    ConfigBody?: TableConfigModel [];
    ConfigFilter?: TableFilterModel [];
    ConfigPager?: PagerConfigModel;
}

// Modelo de la estructura del header
export interface TableHeaderModel {
    content: string;
    filter?: boolean;
    typeFilter?: any;
    columnName?: string;
    class?: string;
    order?: number;
    hidden?: boolean;
}

// Modelo de la estructura de cada celda del body
export interface TableCellModel {
    content?: any;
    value?: any;
    link?: string;
    event?: any;
    class?: string;
    type?: string; // Link, Text, Button
}

// Modelo de la estructura general del body
export interface TableConfigModel {
    class?: string;
    columnName?: string;
    columnType?: string;
}

// Modelo de la estructura de la paginación
export interface PagerConfigModel {
    PageSize: number;
}

// Modelo de la estructura de la paginación por contenido
export interface TableSearchResultModel {
    content?: any[];
    total: number;
}

// Modelo de la estructura del servicio de paginación
export interface TableStateModel {
    page: number;
    pageSize: number;
    searchTerm: string;
    filterTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    indexColumn: number;
    dateRange: any;
}

// Modelo de la estructura de filtro en el header
export interface TableFilterModel {
    columnName: string;
    type: string; // order, date, content
    content?: any;
    typeOrder?: string;
}
