export interface Pageable<T> {
    content: T[];
    first: boolean;
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
}