import type {Customer} from "$lib/core/models/customer.model";

export interface CustomerProfile {
    customer: Customer
    allOrdersCost: number,
    allOrdersProfit: number,
    allOrdersCommission: number,
    allOrdersTotal: number,
    debtTotal: number,
    paidTotal: number
}