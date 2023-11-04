import type {Customer} from "$lib/core/models/customer.model";

export interface Order {
    creationTimestamp: number;
    updateTimestamp: number;
    id: number;
    cost: number;
    profit: number;
    commission: number;
    site: "SHEIN" | "IHERB" | "ASOS" | "NEXT" | "AMAZON" | "MODANISA" | "TRENDIOL" | "LADYMAKEUP";
    status: "ORDERED" | "PROCESSING" | "COMPLETED" | "CANCELED" | "RETURNED";
    orderDate: number;
    shipDate: number;
    note: string;
    customer: Customer;
}