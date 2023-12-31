export enum Site {
    SHEIN = "SHEIN",
    IHERB = "IHERB",
    ASOS = "ASOS",
    NEXT = "NEXT",
    AMAZON = "AMAZON",
    MODANISA = "MODANISA",
    TRENDIOL = "TRENDIOL",
    LADYMAKEUP = "LADYMAKEUP"
}

export const siteList = Object.keys(Site);

export enum Status {
    ORDERED = "ORDERED",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    RETURNED = "RETURNED"
}

export const statusList = Object.keys(Status);

export const DEFAULT_PAGE_SIZE = "25";
export const DEFAULT_PAGE_INDEX = "0";