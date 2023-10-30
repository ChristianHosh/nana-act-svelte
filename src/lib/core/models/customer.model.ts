import type {City} from "$lib/core/models/city.model";

export interface Customer {
    creationTimestamp: number,
    updateTimestamp: number,
    id: number,
    fullName: string,
    address: string,
    phoneNumber: string,
    handle: string,
    city: City,
}